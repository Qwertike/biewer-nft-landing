// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "4307eea7e413a6850719d8df35c2a217", // a te Thirdweb project kulcsod
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider client={client} chain={polygon}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
