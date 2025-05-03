// pages/_app.tsx
import { ThirdwebProvider } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import type { AppProps } from "next/app";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={defineChain(137)} // Polygon
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}





















