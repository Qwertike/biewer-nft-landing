import {
  useAddress,
  useContract,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function LaunchPage() {
  const address = useAddress();
  const { contract } = useContract(
    "0xAFeaAeE58bEDF28807Bd48E6d00AF7AFf5655ba5",
    "nft-drop"
  );

  const [mintOpen, setMintOpen] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [price, setPrice] = useState(5);
  const [claimedSupply, setClaimedSupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  const DISCOUNT_PRICE = 5;
  const NORMAL_PRICE = 10;

  useEffect(() => {
    const launchTime = new Date("2025-05-01T16:00:00Z").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setMintOpen(true);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!contract) return;

    const fetchSupply = async () => {
      const claimed = await contract.totalClaimedSupply();
      const total = await contract.totalSupply();

      setClaimedSupply(claimed.toNumber());
      setTotalSupply(total.toNumber());

      if (claimed.toNumber() >= 500) {
        setPrice(NORMAL_PRICE);
      } else {
        setPrice(DISCOUNT_PRICE);
      }
    };

    fetchSupply();
  }, [contract]);

  const handleMint = async () => {
    if (!contract || !address) return;
    try {
      await contract.claimTo(address, 1);
      alert("✅ Successfully minted!");
    } catch (err) {
      console.error(err);
      alert("❌ Mint failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-10 text-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Biewer Dog Lovers NFT Launch</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
        Welcome to the official launch of the Biewer Dog Lovers NFT Collection — a celebration of charm, loyalty, and community for all lovers of this unique breed.
      </p>

      {!mintOpen ? (
        <div className="text-blue-600 font-semibold text-xl mb-6">
          Minting starts in: {countdown}
        </div>
      ) : (
        <>
          <div className="text-green-600 font-bold text-xl mb-4">
            Mint is now live! Connect your wallet below.
          </div>

          <div className="text-pink-700 font-medium italic mb-4">
            {claimedSupply < 500
              ? `🎉 Early Supporter Offer: First 500 NFTs only ${DISCOUNT_PRICE} MATIC each! Reveal after 250 mints.`
              : `🔓 Price: ${NORMAL_PRICE} MATIC`}
          </div>

          <div className="text-gray-600 mb-6">
            {claimedSupply} / {totalSupply} NFTs minted
          </div>

          <ConnectWallet
            btnTitle="Connect Wallet"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded mb-6"
          />

          {address && (
            <button
              onClick={handleMint}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded"
            >
              Mint 1 NFT ({price} MATIC)
            </button>
          )}

          <div className="mt-10 flex justify-center">
            <a
              href="https://opensea.io/collection/biewer-dog-lovers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0Zm.457 3.936a8.063 8.063 0 0 1 6.28 4.375l-2.05.99A6.028 6.028 0 0 0 12.457 5.9V3.936ZM4.964 8.25a8.063 8.063 0 0 1 6.23-4.28V5.9a6.03 6.03 0 0 0-4.03 3.302l-2.2-.952ZM3.778 13.1a8.063 8.063 0 0 1 .397-2.163l2.025.98a6.03 6.03 0 0 0-.297 2.143l-2.125-.96Zm8.222 7.964a8.063 8.063 0 0 1-6.28-4.373l2.05-.99a6.03 6.03 0 0 0 4.23 2.886v2.477ZM19.035 15.75a8.063 8.063 0 0 1-6.23 4.28v-2.477a6.03 6.03 0 0 0 4.03-3.302l2.2.952Zm1.187-2.848a8.063 8.063 0 0 1-.397 2.163l-2.025-.98a6.03 6.03 0 0 0 .297-2.143l2.125.96Zm-3.822-1.442H7.6a4.4 4.4 0 1 1 8.8 0Z" />
              </svg>
              View Collection on OpenSea
            </a>
          </div>
        </>
      )}

      <div className="text-left max-w-xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-2">Roadmap</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>🔸 Q2 2025: NFT Launch & Mint</li>
          <li>🔸 Q3 2025: Token-Gated Shop Live</li>
          <li>🔸 Q4 2025: Biewer Community Event</li>
          <li>🔸 2026: Breeder Collabs & New Drops</li>
        </ul>
      </div>

      <div className="w-full mt-20 py-6 bg-white bg-opacity-40 backdrop-blur-sm text-center rounded">
        <p className="text-sm text-gray-700">
          Questions? Contact us at{" "}
          <a
            href="mailto:info@biewerdoglovers.com"
            className="text-blue-600 hover:underline"
          >
            info@biewerdoglovers.com
          </a>
        </p>
      </div>
    </div>
  );
}

