"use client";

import {
  ConnectButton,
  useActiveAccount,
  useSendTransaction,
} from "@thirdweb-dev/react"; // ✅ helyes import
import {
  createThirdwebClient,
  defineChain,
  getContract,
  claimTo,
  getClaimConditions,
  getAllLazyMinted,
  totalClaimedSupply,
  totalUnclaimedSupply,
} from "thirdweb";

import { useEffect, useState } from "react";

// Klient létrehozása
const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217", // Az API kulcs
});

// Szerződés lekérése
const contract = getContract({
  client,
  chain: defineChain(137), // Polygon
  address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5", // Az NFT szerződés címe
});

export default function LaunchPage() {
  const account = useActiveAccount(); // Aktív felhasználói fiók
  const sendTransaction = useSendTransaction(); // Tranzakció küldés

  const [price, setPrice] = useState("-");
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);
  const [earlyOffer, setEarlyOffer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Feltételek lekérése
        const claimConditions = await getClaimConditions({ contract });
        if (claimConditions.length > 0) {
          const condition = claimConditions[0];
          const pricePerToken = Number(condition.pricePerToken) / 1e6; // Átváltás MATIC/USDC-ra (6 tizedes)
          setPrice(pricePerToken.toString());
        }

        // Képek lekérése
        const lazyMinted = await getAllLazyMinted({ contract });
        if (lazyMinted.length > 0) {
          const img = lazyMinted[0]?.metadata?.image;
          setImageUrl(img || "");
        }

        // Kiemelt és nem kiemelt NFT-k számának lekérése
        const totalClaimed = await totalClaimedSupply({ contract });
        const totalUnclaimed = await totalUnclaimedSupply({ contract });
        setClaimed(Number(totalClaimed));
        setUnclaimed(Number(totalUnclaimed));

        // Early Offer logika
        if (totalClaimed < 500) {
          setEarlyOffer(true);
        } else {
          setEarlyOffer(false);
        }
      } catch (e) {
        console.error("Hiba a mint információ lekérésénél:", e);
      }
    }

    fetchData();
  }, [claimed]);

  const handleMint = async () => {
    if (!account) return alert("Csatlakozz a tárcával előbb!");
    setLoading(true);
    try {
      let mintPrice = price; // Alapértelmezett ár

      // Early Supporter Offer (500 NFT-ig)
      if (earlyOffer && claimed < 500) {
        mintPrice = "5"; // 5 MATIC ár
      }

      const tx = await sendTransaction(() =>
        claimTo({
          contract,
          to: account.address,
          quantity,
        })
      );
      alert("✅ Sikeres mintelés!");
      console.log("Mint tranzakció:", tx);

      // Frissítsük a claimed számot tranzakció után
      const updatedClaimed = await totalClaimedSupply({ contract });
      setClaimed(Number(updatedClaimed));
    } catch (err) {
      console.error("Mint hiba:", err);
      alert("❌ Mint sikertelen: " + err?.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-yellow-50 to-pink-100">
      <h1 className="text-3xl font-bold">🐶 Biewer Dog Lovers NFT</h1>
      <ConnectButton client={client} />

      {account && (
        <>
          <p>💳 Wallet: {account.address}</p>
          <p>💰 Ár: {earlyOffer ? "5 MATIC" : `${price} USDC`}</p>
          <p>📦 Mintelve: {claimed} / {claimed + unclaimed}</p>

          <div className="flex items-center gap-2">
            <label htmlFor="quantity">Darab:</label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-1 rounded"
            />
          </div>

          <button
            onClick={handleMint}
            disabled={loading}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            {loading ? "Mintelés..." : `Mint ${quantity} NFT (${(Number(earlyOffer ? "5" : price) * quantity).toFixed(2)} ${earlyOffer ? "MATIC" : "USDC"})`}
          </button>

          {imageUrl && (
            <img src={imageUrl} alt="NFT előnézet" className="w-64 h-64 rounded-xl shadow-md mt-4" />
          )}
        </>
      )}
    </div>
  );
}
