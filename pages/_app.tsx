import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain="polygon">
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
