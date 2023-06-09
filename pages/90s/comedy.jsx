import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

import { NextSeo } from "next-seo";

import styles from "../../styles/allChannels.module.css";

import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";
import Donate from "@/components/donate/Donate";

import { channels } from "../../data/channelsList";
import comedyJson from "../../data/comedy.json";
import { info90s } from "@/data/infos";


export default function Comedy({ comedy }) {
  const SEO = {
    title: "Classics TV  | Classics TV | 90s Funniests Comedy TV Channels",
    description:
      "The 90s comedy TV channels brought us iconic sitcoms with memorable characters and hilarious writing that still holds up today. Their legacy still impacts popular culture and paved the way for the future of comedy television.",

    openGraph: {
      title: "Classics TV | Classics TV | 90s Funniests Comedy TV Channels",
      description:
        "The 90s comedy TV channels brought us iconic sitcoms with memorable characters and hilarious writing that still holds up today. Their legacy still impacts popular culture and paved the way for the future of comedy television.",
    },
  };

  const router = useRouter();

  const jsonLength = comedyJson.comedy.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [comedy, setCatoons] = useState(comedyJson.comedy);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = comedy[videoIndex + 1].videoId;
    const nextVideoTitle = comedy[videoIndex + 1].title;

    router.push(
      `/90s/comedy/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`,
      undefined,
      {scroll: false }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <main className={styles.main}>
      <Donate />
      <NextSeo {...SEO} />
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Image
            src="/images/noize.gif"
            alt="TV Noise"
            width={615}
            height={460}
            className={styles.noise}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <Tv />
          <div className={styles.pageInfo}>
            <PageInfo info={info90s} years="90s" />
          </div>
        </div>
        <div className={styles.rightSecton}>
          <div className={styles.ad}>
            <Ad />
          </div>
          <div className={styles.channels}>
            <Channels channels={channels} />
          </div>
          <div className={styles.controls}>
            <Controls playNext={playNext} />
          </div>
          <div className={styles.playInfo}>
            <PlayInfo
              jsonLength={jsonLength}
              channelInfo="The 90s was a decade of great comedy television channels, featuring some of the most beloved and iconic sitcoms of all time. Networks like NBC, ABC, and FOX brought us shows that made us laugh, cry, and think, with memorable characters and hilarious writing that still holds up today. From family-friendly sitcoms to edgier, more irreverent fare, these channels paved the way for the future of comedy television and left a lasting impact on popular culture."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const comedy = comedyJson.comedy;

  const videoId = comedy[0].videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    const title = response.data.items[0].snippet.title;
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "");
    const channelTitle = response.data.items[0].snippet.channelTitle;

    const SEO = {
      title: `Classics TV | ${channelTitle} ${title}`,
      description:
        "The 90s comedy TV channels brought us iconic sitcoms with memorable characters and hilarious writing that still holds up today. Their legacy still impacts popular culture and paved the way for the future of comedy television.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description:
          "The 90s comedy TV channels brought us iconic sitcoms with memorable characters and hilarious writing that still holds up today. Their legacy still impacts popular culture and paved the way for the future of comedy television.",
      },
    };

    return {
      props: {
        comedy,
        video: {
          url,
          title,
        },
        SEO,
        channelInfo: {
          title: channelTitle,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
