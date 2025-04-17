import { useAddress, useOwnedNFTs, useContract, ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export default function TokenGatedShop() {
  const address = useAddress();

  // NFT contract címe (cseréld ki a sajátodra)
  const { contract } = useContract("0xYourContractAddressHere", "nft-drop");
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);

  const hasAccess = nfts && nfts.length > 0;

  // Countdown logic for shop launch
  const [shopOpen, setShopOpen] = useState(false);
  const [shopCountdown, setShopCountdown] = useState("");
  useEffect(() => {
    const shopLaunchDate = new Date("2025-07-01T10:00:00Z").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = shopLaunchDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setShopOpen(true);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setShopCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-2 text-center">Biewer Dog Lovers Exclusive Shop</h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        {shopOpen ? (
          <span className="text-green-600 font-semibold">Shop is now open!</span>
        ) : (
          <>Shop opens in: <span className="font-semibold text-blue-600">{shopCountdown}</span></>
        )}
      </p>

      <p className="max-w-2xl mx-auto text-center text-gray-700 mb-8">
        <strong>Biewer Dog Lovers</strong> was created out of pure passion for one of the most unique and lovable dog breeds in the world – the Biewer Terrier. But this isn’t just another NFT project. This is a heartfelt community for dog lovers, collectors, and those who believe in real-world utility beyond digital art.
      </p>

      <div className="max-w-3xl mx-auto text-sm text-gray-600 mb-10">
        <ul className="list-disc list-inside space-y-2">
          <li>Celebrate the beauty and charm of the Biewer Terrier</li>
          <li>Connect dog lovers worldwide through unique digital collectibles</li>
          <li>Holder-only benefits: merchandise, whitelist access, discounts, and more</li>
          <li>Future plans: events, partnerships with breeders, exclusive content</li>
        </ul>

        <div className="mt-6 text-center space-y-4">
          <a
            href="/Biewer_Dog_Lovers_Roadmap.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded"
          >
            Download Full Roadmap (PDF)
          </a>

          <a
            href="#"
            className="inline-block bg-gray-400 text-white font-semibold px-6 py-3 rounded cursor-not-allowed"
            title="OpenSea collection will be available soon"
          >
            View on OpenSea (Coming Soon)
          </a>
        </div>
      </div>

      {!shopOpen ? (
        <p className="text-center text-gray-500 italic">Shop content will be available once the countdown ends.</p>
      ) : !address ? (
        <div className="flex justify-center">
          <ConnectWallet btnTitle="Connect Wallet to Enter" />
        </div>
      ) : isLoading ? (
        <p className="text-center">Checking your NFTs...</p>
      ) : hasAccess ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Termékek (demo) */}
          <div className="border rounded-xl p-4 shadow">
            <img src="/shop/tshirt.jpg" alt="T-shirt" className="w-full mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">Biewer Lovers T-shirt</h2>
            <p className="mb-2">Exclusive design for holders only.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
          </div>
          <div className="border rounded-xl p-4 shadow">
            <img src="/shop/mug.jpg" alt="Mug" className="w-full mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">Biewer Mug</h2>
            <p className="mb-2">Start your day with Biewer energy!</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
          </div>
          <div className="border rounded-xl p-4 shadow">
            <img src="/shop/bone.jpg" alt="Dog Bone Toy" className="w-full mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">Plush Dog Toy</h2>
            <p className="mb-2">Perfect for your furry friend.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Buy Now</button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-600">Access denied. You must own at least one Biewer Dog Lovers NFT to view the shop.</p>
      )}
    </div>
  );
}
