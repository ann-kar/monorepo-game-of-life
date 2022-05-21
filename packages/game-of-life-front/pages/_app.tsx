import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to game-of-life-front!</title>
      </Head>
      <main className="bg-gray-100 min-h-screen">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
