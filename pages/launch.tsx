import {
  createThirdwebClient,
  getContract,
  getClaimConditions,
  claimTo,
} from "thirdweb";
import { useEffect, useState } from "react";

// Client létrehozása
const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217",
});

const contract = getContract({
  client,
  chain: defineChain(137), // Polygon
  address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5", // Az NFT Drop szerződés címe
});

export default function MintPage() {
  const [price, setPrice] = useState("-");
  const [maxClaimable, setMaxClaimable] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Aktív claim fázis lekérdezése
  useEffect(() => {
    async function fetchData() {
      try {
        const claimConditions = await getClaimConditions({ contract });
        if (claimConditions.length > 0) {
          const claimCondition = claimConditions[0]; // Az első aktív fázis feltételei
          const pricePerToken = Number(claimCondition.pricePerToken) / 1e18; // Átváltás POL-ra
          const maxPerWallet = Number(claimCondition.quantityLimitPerWallet);
          setPrice(pricePerToken.toString());
          setMaxClaimable(maxPerWallet);
        }
      } catch (err) {
        console.error("Hiba a lekérés során:", err);
      }
    }

    fetchData();
  }, []);

  const handleMint = async () => {
    if (!account) return alert("Előbb csatlakozz a tárcáddal!");
    setLoading(true);
    try {
      const tx = await sendTransaction(() =>
        claimTo({
          contract,
          to: account.address,
          quantity,
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-blue-100 to-pink-100">
      <h1 className="text-3xl font-bold">🐶 Biewer Dog Lovers NFT</h1>
      <ConnectButton client={client} />
      {account && (
        <>
          <div>🎯 Tárca: {account.address}</div>
          <div>💰 Ár: {price} POL / NFT</div>
          <div>📦 Max / wallet: {maxClaimable}</div>

          <button
            onClick={handleMint}
            disabled={loading || maxClaimable < 1}
            className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700"
          >
            {loading
              ? "Mintelés..."
              : `Mint ${quantity} NFT (${(Number(price) * quantity).toFixed(2)} POL)`}
          </button>
        </>
      )}
    </div>
  );
}
