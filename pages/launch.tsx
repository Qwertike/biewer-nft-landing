"use client";

import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useSendTransaction,
  useOwnedNFTs,
} from "thirdweb/react";
import {
  createThirdwebClient,
  defineChain,
  getContract,
  claimTo,
  getActiveClaimCondition,
} from "thirdweb";

import { useEffect, useState } from "react";

const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217",
});

const contract = getContract({
  client,
  chain: defineChain(137), // Polygon
  address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5",
});

export default function MintPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const sendTransaction = useSendTransaction();
  const [price, setPrice] = useState("-");
  const [maxClaimable, setMaxClaimable] = useState("-");
  const [loading, setLoading] = useState(false);

  const { data: nfts } = useOwnedNFTs({ contract, account });

  // Aktív claim fázis lekérdezés
  useEffect(() => {
    async function fetchClaimCondition() {
      try {
        const claimCondition = await getActiveClaimCondition({ contract });

        const pricePerToken = Number(claimCondition.pricePerToken) / 1e18;
        const maxPerWallet = Number(claimCondition.quantityLimitPerWallet);

        setPrice(pricePerToken.toString());
        setMaxClaimable(maxPerWallet.toString());
      } catch (err) {
        console.error("Nem sikerült lekérni az aktív claim fázist:", err);
      }
    }

    fetchClaimCondition();
  }, []);

  const handleMint = async () => {
    if (!account) return alert("Előbb csatlakozz a tárcáddal!");
    setLoading(true);
    try {
      const tx = await sendTransaction(() =>
        claimTo({
          contract,
          to: account.address,
          quantity: 1,
        })
      );
      alert("✅ NFT sikeresen mintelve!");
      console.log("Mint sikeres:", tx);
    } catch (err) {
      console.error("Mintelés hiba:", err);
      alert("❌ Mintelés sikertelen: " + err?.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-blue-100 to-pink-100">
      <h1 className="text-2xl font-bold">🐶 Biewer Dog Lovers NFT</h1>
      <ConnectButton client={client} />
      {account && (
        <>
          <div>🎯 Tárca: {account.address}</div>
          <div>💰 Ár: {price} MATIC</div>
          <div>📦 Max / wallet: {maxClaimable}</div>
          <button
            onClick={handleMint}
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700"
          >
            {loading ? "Mintelés..." : `Mint 1 NFT (${price} MATIC)`}
          </button>
          <div>🧾 Jelenlegi NFT-jeid száma: {nfts?.length || 0}</div>
        </>
      )}
    </div>
  );
}
