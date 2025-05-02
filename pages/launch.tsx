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
  getAllLazyMinted,
  totalClaimedSupply,
  totalUnclaimedSupply,
} from "thirdweb";

import { useEffect, useState } from "react";

const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217",
});

const contract = getContract({
  client,
  chain: defineChain(137),
  address: "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5",
});

export default function MintPage() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const sendTransaction = useSendTransaction();

  const [price, setPrice] = useState("-");
  const [maxClaimable, setMaxClaimable] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [maxMintableNow, setMaxMintableNow] = useState(1);
  const [claimed, setClaimed] = useState(0);
  const [unclaimed, setUnclaimed] = useState(0);

  const { data: ownedNFTs } = useOwnedNFTs({ contract, account });

  useEffect(() => {
    async function fetchData() {
      try {
        const claimCondition = await getActiveClaimCondition({ contract });
        const pricePerToken = Number(claimCondition.pricePerToken) / 1e18;
        const maxPerWallet = Number(claimCondition.quantityLimitPerWallet);
        setPrice(pricePerToken.toString());
        setMaxClaimable(maxPerWallet);

        const userOwns = ownedNFTs?.length || 0;
        const remaining = Math.max(0, maxPerWallet - userOwns);
        setMaxMintableNow(remaining);
        if (quantity > remaining) setQuantity(remaining || 1);

        const lazyMinted = await getAllLazyMinted({ contract });
        if (lazyMinted.length > 0) {
          const img = lazyMinted[0]?.metadata?.image;
          setImageUrl(img || "");
        }

        const totalClaimed = await totalClaimedSupply({ contract });
        const totalUnclaimed = await totalUnclaimedSupply({ contract });
        setClaimed(Number(totalClaimed));
        setUnclaimed(Number(totalUnclaimed));
      } catch (err) {
        console.error("Hiba a lekérés során:", err);
      }
    }

    fetchData();
  }, [account, ownedNFTs, quantity]);

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
          <div>💰 Ár: {price} MATIC / NFT</div>
          <div>📦 Max / wallet: {maxClaimable}</div>
          <div>🧾 Te jelenleg: {ownedNFTs?.length || 0} db NFT-t birtokolsz</div>
          <div>🔢 Még ennyit mintelhetsz: {maxMintableNow}</div>

          {/* Összesített infók */}
          <div>📊 Összesen mintelve: {claimed} db</div>
          <div>📦 Még elérhető: {unclaimed} db</div>

          <div className="flex items-center gap-2">
            <label htmlFor="quantity">Darab:</label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={maxMintableNow}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setQuantity(Math.max(1, Math.min(val, maxMintableNow)));
              }}
              className="border rounded px-2 py-1 w-20"
            />
          </div>

          <button
            onClick={handleMint}
            disabled={loading || maxMintableNow < 1}
            className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700"
          >
            {loading
              ? "Mintelés..."
              : `Mint ${quantity} NFT (${(Number(price) * quantity).toFixed(2)} MATIC)`}
          </button>

          {imageUrl && (
            <img
              src={imageUrl}
              alt="NFT előnézet"
              className="w-64 h-64 object-cover rounded-xl shadow-lg"
            />
          )}
        </>
      )}
    </div>
  );
}
