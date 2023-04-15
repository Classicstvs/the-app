import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preload" /> */}
        <meta name="theme-color" content="#33333" />
        <meta property="og:image" content="/images/og_image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="228" />
        <meta property="og:image:height" content="122" />
        <meta
          name="description"
          content="Relive the golden age of television with our classic TV channels. Our vintage collection will transport you back in time. Tune in and enjoy the best from the 50s, 60s, 70s, 80s, 90s, and 2000s."
        />
        <meta property="og:title" content="Classics TV" />
        <meta property="og:url" content="www.classicstv.net" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
