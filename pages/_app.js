import "../styles/globals.css";
import Layout from "@/components/layout/Layout";

import Script from "next/script";

import Head from "next/head";

import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import { Roboto } from "next/font/google";

import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo {...SEO} />
      <GoogleAnalytics trackPageViews />
      <Layout className={roboto.className}>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4803482388154607"
      />
    </>
  );
}
