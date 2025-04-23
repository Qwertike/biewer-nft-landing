import "../styles/globals.css"; // Importáljuk a globális stílusokat
import { ThirdwebProvider } from "@thirdweb-dev/react"; // Importáljuk a Thirdweb szolgáltatást
import type { AppProps } from "next/app"; // Alap Next.js AppProps típus

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="polygon"> {/* Polygon hálózat beállítása */}
      <Component {...pageProps} /> {/* A megfelelő oldal renderelése */}
    </ThirdwebProvider>
  );
}

export default MyApp;
