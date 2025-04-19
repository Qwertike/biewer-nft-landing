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
        <div className="text-green-600 font-bold text-xl mb-6">
          Mint is now live! Connect your wallet below.
        </div>
      )}

      <div className="mb-10">
        <ConnectWallet
          btnTitle="Connect Wallet"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
        />
      </div>

      <div className="text-left max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Roadmap</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>🔸 Q2 2025: NFT Launch & Mint</li>
          <li>🔸 Q3 2025: Token-Gated Shop Live</li>
          <li>🔸 Q4 2025: Biewer Community Event</li>
          <li>🔸 2026: Breeder Collabs & New Drops</li>
        </ul>
      </div>

      {/* Email szekció lejjebb */}
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
