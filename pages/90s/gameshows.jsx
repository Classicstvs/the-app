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

import { channels } from "../../data/channelsList";
import gameshowsJson from "../../data/gameshows.json";
import { info90s } from "@/data/infos";

export default function Gameshows({ gameshows }) {
  const SEO = {
    title: "Classics TV | 90s Gameshows TV Channels ",
    description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",

    openGraph: {
      title: "Classics TV | 90s Gameshows TV Channels ",
      description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",
    },
  };

  const router = useRouter();

  const jsonLength = gameshowsJson.gameshows.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [gameshows, setCatoons] = useState(gameshowsJson.gameshows);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = gameshows[videoIndex + 1].videoId;
    const nextVideoTitle = gameshows[videoIndex + 1].title;

    router.push(
      `/90s/gameshows/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, );

  return (
    <main className={styles.main}>
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
              channelInfo="Game show TV channels from the 90s were a fun and exciting way to spend an afternoon or evening. From Jeopardy! to Wheel of Fortune, they brought us some of the most iconic game shows of all time, as well as new and innovative programs that kept us guessing and entertained. These channels gave us a chance to test our knowledge and skills, compete against other contestants, and win prizes ranging from cash to cars. Whether you were a fan of classic quiz shows or modern game shows with a twist, there was always something to watch on game show TV channels in the 90s. Today, these channels may not be as prevalent as they once were, but their legacy lives on in the many game shows that continue to entertain and captivate audiences today."
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
  const gameshows = gameshowsJson.gameshows;

  const videoId = gameshows[0].videoId;
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
      description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",
      },
    };

    return {
      props: {
        gameshows,
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
