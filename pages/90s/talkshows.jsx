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
import talkshowsJson from "../../data/talkshows.json";
import { info90s } from "@/data/infos";


export default function Talkshows({ talkshows }) {
  const SEO = {
    title: "Classics TV | 90s Talkshows TV Channels",
    description:
      "Explore the influential and entertaining talk show TV channels of the 90s, featuring diverse perspectives and celebrity interviews. A landmark in TV history.",

    openGraph: {
      title: "Classics TV | 90s Talkshows TV Channels",
      description:
        "Explore the influential and entertaining talk show TV channels of the 90s, featuring diverse perspectives and celebrity interviews. A landmark in TV history.",
    },
  };

  const router = useRouter();

  const jsonLength = talkshowsJson.talkshows.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [talkshows, setCatoons] = useState(talkshowsJson.talkshows);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = talkshows[videoIndex + 1].videoId;
    const nextVideoTitle = talkshows[videoIndex + 1].title;

    router.push(
      `/90s/talkshows/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`,
      undefined,
      { scroll: false }
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
              channelInfo="Talk show TV channels from the 90s were a platform for some of the most influential and entertaining personalities of the decade. From Oprah to Jerry Springer, they brought us a wide range of guests and topics, from hard-hitting political discussions to lighthearted celebrity interviews. These channels gave us a chance to hear diverse perspectives and engage in debates and conversations that were both engaging and informative. They also provided us with a window into the lives of the rich and famous, as we watched our favorite celebrities reveal intimate details of their personal lives on air. Today, talk show TV channels continue to be a popular format, but those from the 90s remain a landmark in the history of television and popular culture."
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
  const talkshows = talkshowsJson.talkshows;

  const videoId = talkshows[0].videoId;
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
        "Explore the influential and entertaining talk show TV channels of the 90s, featuring diverse perspectives and celebrity interviews. A landmark in TV history.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description:
          "Explore the influential and entertaining talk show TV channels of the 90s, featuring diverse perspectives and celebrity interviews. A landmark in TV history.",
      },
    };

    return {
      props: {
        talkshows,
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
