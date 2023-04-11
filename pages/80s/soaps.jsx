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
import soapsJson from "../../data/soaps.json";

export default function Soaps({soaps}) {
  const SEO = {
    title: "Classics TV | 90s Best Soaps TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Best Soaps TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = soapsJson.soaps.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [soaps, setCatoons] = useState(soapsJson.soaps);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = soaps[videoIndex + 1].videoId;
    const nextVideoTitle = soaps[videoIndex + 1].title;

    router.push(
      `/90s/soaps/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`, undefined, { scroll: false }
    );
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [videoIndex]);

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
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls
            playNext={playNext}
          />
          <PlayInfo
            jsonLength={jsonLength}
            channelInfo="Soap opera TV channels from the 90s were a mainstay of daytime television and provided viewers with a daily dose of drama, romance, and intrigue. From Days of Our Lives to General Hospital, they brought us stories that kept us glued to our screens, following the lives of our favorite characters as they navigated love triangles, family feuds, and other dramatic events. These channels provided us with an escape from our own lives, as we got lost in the twists and turns of the soap opera world. Whether you were a fan of classic shows or the latest new releases, there was always something to watch on soap opera TV channels in the 90s. Even today, these shows continue to attract loyal fans, and they remain a significant part of the daytime television landscape."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}


export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const soaps = soapsJson.soaps;

  const videoId = soaps[0].videoId;
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
      description: "",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description: "",
      },
    };

    return {
      props: {
        soaps,
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
