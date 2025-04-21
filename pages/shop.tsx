import Image from 'next/image';
import ComingSoonHero from '/public/coming-soon-biewer.png';

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-center px-4 py-12">
      
      {/* Hero kép animációval */}
      <div className="w-full max-w-2xl mb-8 animate-pulse">
        <Image
          src={ComingSoonHero}
          alt="Biewer Dog Lovers Shop - Coming Soon"
          layout="responsive"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Szöveg és gomb */}
      <div className="max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Token-Gated Shop</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our exclusive shop is coming in the second half of the year. Stay tuned for exciting merchandise and perks for Biewer Dog Lovers NFT holders!
        </p>

        {/* Discord gomb */}
        <a
          href="https://discord.gg/CWw9r5cP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded shadow"
        >
          Join Our Discord
        </a>
      </div>
    </div>
  );
}
