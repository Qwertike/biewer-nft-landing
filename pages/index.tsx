import Image from 'next/image';
import MysteryDog from '/public/Mystery Dog.png';

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

      {/* Szöveg */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Biewer Dog Lovers
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        A heartfelt NFT project for Biewer Terrier lovers. Connect, collect, and access exclusive benefits!
      </p>

      {/* Oldal gombok */}
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

      {/* Közösségi gombok: Discord, Instagram, OpenSea */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        
        {/* Discord */}
        <a
          href="https://discord.gg/CWw9r5cP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded shadow"
        >
          <span>🔗</span>
          Join Discord
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/biewerdoglovers/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium px-5 py-3 rounded shadow"
        >
          <span>📷</span>
          Instagram
        </a>

        {/* OpenSea */}
        <a
          href="https://opensea.io/collection/biewer-dog-lovers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded shadow"
        >
          <span>🌊</span>
          View on OpenSea
        </a>
      </div>

      {/* Kapcsolat */}
      <p className="mt-10 text-sm text-gray-500">
        Contact us at{' '}
        <a
          href="mailto:info@biewerdoglovers.com"
          className="text-blue-600 hover:underline"
        >
          info@biewerdoglovers.com
        </a>
      </p>
    </div>
  );
}
