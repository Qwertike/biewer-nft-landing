import { useEffect, useState } from "react";
import {
  createThirdwebClient,
  getContract,
  defineChain,
  prepareContractCall,
  sendTransaction,
  resolveMethod,
  readContract,
} from "thirdweb";
import { ConnectButton, useActiveAccount, useConnect } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217", // IDE írd be a saját thirdweb project API kulcsodat
});

const contract = getContract({
  client,
  chain: defineChain(137), // Matic mainnet (vagy módosíts teszt hálózatra)
  address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5",
});

export default function MintPage() {
  const account = useActiveAccount();
  const connect = useConnect();

  const [claimed, setClaimed] = useState("0");
  const [total, setTotal] = useState("0");
  const [price, setPrice] = useState("-");
  const [currency, setCurrency] = useState("MATIC");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalSupply = await readContract({
          contract,
          method: resolveMethod("totalSupply"),
        });
        setTotal(totalSupply.toString());

        const claimedSupply = await readContract({
          contract,
          method: resolveMethod("totalClaimedSupply"),
        });
        setClaimed(claimedSupply.toString());

        const activeCondition = await readContract({
          contract,
          method: resolveMethod("getClaimConditionById"),
          params: [23], // vagy cseréld ki a helyes ID-re
        });

        setPrice(activeCondition.currencyMetadata.displayValue);
        setCurrency(activeCondition.currencyMetadata.symbol);
      } catch (err) {
        console.error("Hiba az adatok lekérésekor:", err);
      }
    };

    fetchData();
  }, []);

  const mintNFT = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("claim"),
        params: [account.address, 1],
      });

      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });

      alert("✅ Sikeres mint! TX: " + transactionHash);
    } catch (err) {
      console.error("Mint hiba:", err);
      alert("❌ Mintelés sikertelen: " + (err?.message || "Ismeretlen hiba"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-100 to-pink-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold">🐶 Biewer Dog Lovers NFT</h1>

      <div>
        {claimed} / {total} NFT minted
      </div>

      <div>💰 Aktuális ár: {price} {currency}</div>

      <ConnectButton connect={connect} />

      {account && (
        <button
          disabled={loading}
          onClick={mintNFT}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded"
        >
          {loading ? "Minting..." : `Mint 1 NFT (${price} ${currency})`}
        </button>
      )}
    </div>
  );
}
