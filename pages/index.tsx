import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      
      {/* Animált kép */}
      <div className="w-64 h-64 mb-8 animate-float shadow-lg rounded-full overflow-hidden border-4 border-white">
        <Image
          src="/Mystery Dog.png"  // A helyes elérési út a /public mappában
          alt="Mystery Dog NFT"
          layout="responsive"
          objectFit="cover"
          width={400}
          height={400}
        />
      </div>

      {/* Szöveg */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Biewer Dog Lovers
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        A heartfelt NFT project for Biewer Terrier lovers. Connect, collect, and access exclusive benefits!
      </p>

      {/* Közösségépítő szöveg */}
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        Our mission is to build a passionate community of Biewer Terrier enthusiasts. With NFTs and Web3 tools, we aim to support dog lovers and create a space for them to thrive. Stay tuned for the upcoming Token-Gated Shop launching in late 2025, where you can access exclusive products and experiences!
      </p>

      {/* "Mint Launch Info" gomb */}
      <a
        href="/launch"
        className="mt-4 inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded"
      >
        View Mint Launch Info
      </a>

      {/* "Shop" gomb lejjebb helyezve */}
      <a
        href="/shop"
        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded"
      >
        Enter Shop (Coming Soon)
      </a>

      {/* Letisztult közösségi ikon sor */}
      <div className="mt-10 flex flex-row gap-6 items-center justify-center text-2xl text-gray-700">
        {/* Discord */}
        <a
          href="https://discord.gg/CWw9r5cP"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-indigo-600 hover:scale-110 transition"
          title="Join Discord"
        >
          🔗
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/biewerdoglovers/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-500 hover:scale-110 transition"
          title="Instagram"
        >
          📷
        </a>

        {/* OpenSea */}
        <a
          href="https://opensea.io/collection/biewer-dog-lovers"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 hover:scale-110 transition"
          title="View on OpenSea"
        >
          🌊
        </a>

        {/* Twitter (X) */}
        <a
          href="https://twitter.com/DogBiewer24201"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black hover:scale-110 transition"
          title="Follow on X"
        >
          🐦
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
