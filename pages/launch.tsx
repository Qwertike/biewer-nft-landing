import {
  useAddress,
  useContract,
  useContractRead,
  useClaimNFT,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5";

export default function MintPage() {
  const address = useAddress();
  const { contract } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const { data: totalSupply } = useContractRead(contract, "totalSupply");
  const { data: claimedSupply } = useContractRead(contract, "totalClaimedSupply");

  const [price, setPrice] = useState("–");
  const [currency, setCurrency] = useState("MATIC");
  const { mutateAsync: claimNFT, isLoading } = useClaimNFT(contract);

  // Aktív claim feltételek lekérése az Id alapján
  useEffect(() => {
    if (!contract) return;

    const fetchClaimCondition = async () => {
      try {
        // Az első claim feltétel ID-jának lekérése (pl. 0)
        const activeClaimCondition = await contract.getClaimConditionById(0);
        
        // Állítsuk be az árat és a pénznemet
        setPrice(activeClaimCondition.currencyMetadata.displayValue);
        setCurrency(activeClaimCondition.currencyMetadata.symbol);
      } catch (error) {
        console.error("Nincs aktív claim fázis vagy hiba:", error);
      }
    };

    fetchClaimCondition();
  }, [contract]);

  const mintNFT = async () => {
    if (!contract || !address) return;
    try {
      const tx = await claimNFT({ to: address, quantity: 1 });
      alert("✅ Sikeres mint!");
      console.log("Mint tx:", tx);
    } catch (err: any) {
      alert(`❌ Mint failed: ${err?.reason || err?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-100 to-pink-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold">🐶 Biewer Dog Lovers NFT</h1>

      <div>
        {claimedSupply?.toString() || 0} / {totalSupply?.toString() || 0} NFT minted
      </div>

      <div>💰 Aktuális ár: {price} {currency}</div>

      <ConnectWallet />

      {address && (
        <button
          disabled={isLoading}
          onClick={mintNFT}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded"
        >
          {isLoading ? "Minting..." : `Mint 1 NFT (${price} ${currency})`}
        </button>
      )}
    </div>
  );
}
