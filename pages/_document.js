import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="preload" /> */}
        <meta name="theme-color" content="#33333" />
        <meta
          property="og:image"
          content="/images/og_image.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="228" />
        <meta property="og:image:height" content="122" />
        <meta name="description" content="Relive the golden age of television with our classic TV channels from the past. Big collection of vintage TV channels will transport you back in time. Tune in to our channels and enjoy the best of classic TV from the 50s, 60s, 70s, 80s, 90s, and 2000s." />
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
