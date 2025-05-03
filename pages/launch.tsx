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

import { contractConst, chainConst } from "../consts/parameters";
import { useEffect, useState } from "react";

// Thirdweb kliens létrehozása
const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217", // a te Thirdweb project kulcsod
});

// Contract beállítás
const contract = getContract({
  client,
  chain: defineChain(chainConst),
  address: contractConst,
});

export default function LaunchPage() {
  const account = useActiveAccount();
  const sendTransaction = useSendTransaction();

  const [price, setPrice] = useState("-"); // Ár tárolása
  const [quantity, setQuantity] = useState(1); // Mintelni kívánt darabok száma
  const [imageUrl, setImageUrl] = useState(""); // Kép URL
  const [loading, setLoading] = useState(false); // Betöltés állapot
  const [claimed, setClaimed] = useState(0); // Mintelve lévő NFT-k száma
  const [unclaimed, setUnclaimed] = useState(0); // Elérhető NFT-k száma
  const [earlyOffer, setEarlyOffer] = useState(false); // Early offer logika

  useEffect(() => {
    async function fetchData() {
      try {
        // ClaimConditions lekérése
        const claimConditions = await getClaimConditions({ contract });
        if (claimConditions.length > 0) {
          const condition = claimConditions[0];
          const pricePerToken = Number(condition.pricePerToken) / 1e6; // USDC
          setPrice(pricePerToken.toString());
        }

        // Lazy minted NFT-k lekérése
        const lazyMinted = await getAllLazyMinted({ contract });
        if (lazyMinted.length > 0) {
          const img = lazyMinted[0]?.metadata?.image;
          setImageUrl(img || "");
        }

        // Teljes mintelt és elérhető NFT számok lekérése
        const totalClaimed = await totalClaimedSupply({ contract });
        const totalUnclaimed = await totalUnclaimedSupply({ contract });
        setClaimed(Number(totalClaimed));
        setUnclaimed(Number(totalUnclaimed));

        // Early Offer logika
        if (totalClaimed < 500) {
          setEarlyOffer(true); // Az első 500 NFT-nél 5 USDC
        } else {
          setEarlyOffer(false);
        }
      } catch (e) {
        console.error("Mint adatok lekérése sikertelen:", e);
      }
    }

    fetchData();
  }, [claimed]); // A claimed változóra figyelünk, hogy mindig frissülni tudjon a számlálás

  // Mintelés kezelése
  const handleMint = async () => {
    if (!account) return alert("Csatlakozz a tárcával előbb!");
    setLoading(true);
    try {
      let mintPrice = price; // Alapértelmezett ár

      // Ha az Early Supporter Offer aktív, akkor 5 USDC
      if (earlyOffer && claimed < 500) {
        mintPrice = "5"; // 5 USDC ár
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
    } catch (err: any) {
      console.error("Mintelés sikertelen:", err);
      alert("❌ Hiba: " + err?.message);
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
          <p>💰 Ár: {earlyOffer ? "5 USDC" : `${price} USDC`}</p> {/* Early offer esetén 5 USDC */}
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
            {loading ? "Mintelés..." : `Mint ${quantity} NFT (${(Number(price) * quantity).toFixed(2)} USDC)`}
          </button>

          {imageUrl && (
            <img src={imageUrl} alt="NFT előnézet" className="w-64 h-64 rounded-xl shadow-md mt-4" />
          )}
        </>
      )}
    </div>
  );
}

