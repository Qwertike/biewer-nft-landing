import Image from 'next/image';
import MysteryDog from '/public/Mystery Dog.png'; // ha máshol van, írd át az útvonalat

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Animált kép */}
      <div className="w-64 h-64 mb-8 animate-float shadow-lg rounded-full overflow-hidden border-4 border-white">
        <Image
          src={MysteryDog}
          alt="Mystery Dog NFT"
          layout="responsive"
          objectFit="cover"
        />
      </div>

      {/* Szövegek és gombok */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Biewer Dog Lovers
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        A heartfelt NFT project for Biewer Terrier lovers. Connect, collect, and access exclusive benefits!
      </p>
      <a
        href="/shop"
        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
      >
        Enter Shop
      </a>
      <a
        href="/launch"
        className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded"
      >
        View Mint Launch Info
      </a>
    </div>
  );
}
