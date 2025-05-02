// launch.js
import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const NFTDropAddress = "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5";

export default function Launch() {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const nftDrop = useNFTDrop(NFTDropAddress);

  const [claimCondition, setClaimCondition] = useState(null);
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [maxPerWallet, setMaxPerWallet] = useState(0);

  // Claim feltételek lekérdezése
  useEffect(() => {
    async function fetchClaimData() {
      if (!nftDrop) return;

      try {
        const conditions = await nftDrop.claimConditions.getActive();
        setClaimCondition(conditions);
        setPrice(conditions.currencyMetadata.displayValue);
        setMaxPerWallet(conditions.maxClaimablePerWallet.toNumber());
      } catch (err) {
        console.error("Nem sikerült lekérni a claim feltételeket", err);
      }
    }

    fetchClaimData();
  }, [nftDrop]);

  const mintNFT = async () => {
    if (!nftDrop || !address) return;
    setLoading(true);
    try {
      const tx = await nftDrop.claimTo(address, quantity);
      alert("🎉 NFT sikeresen mintelve!");
      console.log("Sikeres tranzakció:", tx);
    } catch (err) {
      console.error("Mintelés hiba:", err);
      alert("❌ Mintelés sikertelen: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 bg-gradient-to-br from-purple-100 to-blue-100">
      <h1 className="text-3xl font-bold">🐶 Biewer Dog Lovers NFT</h1>

      {!address ? (
        <button onClick={connectWithMetamask} className="bg-purple-600 text-white px-6 py-2 rounded">
          Csatlakozás Metamaskkal
        </button>
      ) : (
        <>
          <p>Wallet címed: {address}</p>
          <p>Ár: {price} POL / NFT</p>
          <p>Max mint / wallet: {maxPerWallet}</p>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(maxPerWallet, Number(e.target.value)))}
            min={1}
            max={maxPerWallet}
            className="border px-2 py-1 rounded w-20"
          />

          <button
            onClick={mintNFT}
            disabled={loading}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            {loading ? "Mintelés..." : `Mintelj ${quantity} NFT-t`}
          </button>
        </>
      )}
    </div>
  );
}
