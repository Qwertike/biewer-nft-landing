import Image from 'next/image';
import ComingSoonHero from '/public/coming-soon-biewer.png'; // Cseréld le erre a fájlra, ha máshogy nevezted

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-center px-4 py-12">
      
      {/* Hero kép */}
      <div className="w-full max-w-2xl mb-8">
        <Image
          src={ComingSoonHero}
          alt="Biewer Dog Lovers Shop - Coming Soon"
          layout="responsive"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Szövegblokk */}
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Token-Gated Shop</h1>
        <p className="text-lg text-gray-700">
          Our exclusive shop is coming in the second half of the year. Stay tuned for exciting merchandise and perks for Biewer Dog Lovers NFT holders!
        </p>
      </div>
    </div>
  );
}
