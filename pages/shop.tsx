import Image from 'next/image';
import ComingSoonHero from '/public/coming-soon-biewer.png';

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 text-center px-4 py-12">
      
      {/* Hero kép fix méretben */}
      <div className="w-[300px] sm:w-[400px] mb-8 animate-pulse">
        <Image
          src={ComingSoonHero}
          alt="Biewer Dog Lovers Shop - Coming Soon"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Szöveg és Discord gomb */}
      <div className="max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Token-Gated Shop</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our exclusive shop is coming in the second half of the year. Stay tuned for exciting merchandise and perks for Biewer Dog Lovers NFT holders!
        </p>

        <p className="text-lg text-gray-700 mb-6">
          In the second half of 2025, our shop will be live. With access via your NFT and wallet, you'll enjoy exclusive discounts on a range of Biewer Dog Lovers themed items, such as dog-inspired t-shirts, caps, and other cool merch!
        </p>

        <a
          href="https://discord.gg/CWw9r5cP"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded shadow"
        >
          Join Our Discord
        </a>
      </div>

      {/* Twitter Pixel for Shop Tracking */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(e,t,n,s,u,a){
              e.twq||(s=e.twq=function(){
                s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
              },
              s.version='1.1',
              s.queue=[],
              u=t.createElement(n),
              u.async=!0,
              u.src='https://static.ads-twitter.com/uwt.js',
              a=t.getElementsByTagName(n)[0],
              a.parentNode.insertBefore(u,a))
            }(window,document,'script');
            twq('config','pku6z');
          `
        }}
      ></script>
    </div>
  );
}

