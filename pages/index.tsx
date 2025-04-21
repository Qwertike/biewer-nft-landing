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

      {/* Szövegek */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Biewer Dog Lovers
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        A heartfelt NFT project for Biewer Terrier lovers. Connect, collect, and access exclusive benefits!
      </p>

      {/* Gombok */}
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

      {/* 🔗 Discord link stílusosan */}
      <a
        href="https://discord.gg/CWw9r5cP"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-3 rounded shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.317 4.369A19.791 19.791 0 0016.885 3a14.766 14.766 0 00-.711 1.493 18.348 18.348 0 00-4.348 0A14.77 14.77 0 0011.115 3 19.76 19.76 0 003.683 4.369 21.365 21.365 0 002 16.504a19.802 19.802 0 006.207 3.126 14.666 14.666 0 001.07-1.748 13.105 13.105 0 01-2.06-.997c.173-.127.342-.26.507-.396a13.066 13.066 0 0010.552 0c.165.136.334.269.507.396a13.133 13.133 0 01-2.061.997c.347.61.725 1.204 1.07 1.748A19.785 19.785 0 0022 16.504a21.371 21.371 0 00-1.683-12.135zM9.215 14.034c-1.185 0-2.153-1.085-2.153-2.419 0-1.333.954-2.418 2.153-2.418 1.207 0 2.17 1.096 2.153 2.418 0 1.334-.954 2.419-2.153 2.419zm5.57 0c-1.185 0-2.153-1.085-2.153-2.419 0-1.333.954-2.418 2.153-2.418 1.207 0 2.17 1.096 2.153 2.418 0 1.334-.946 2.419-2.153 2.419z" />
        </svg>
        Join us on Discord
      </a>

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
