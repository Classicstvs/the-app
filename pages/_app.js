import "../styles/globals.css";
import Layout from "@/components/layout/Layout";

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['100','300','400','500','700','900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <Layout className={roboto.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
