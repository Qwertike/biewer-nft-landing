import { AppProps } from 'next/app';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain={ChainId.Polygon} // <-- EZ A HELYES PROP!
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

