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
import showsJson from "../../data/shows.json";
import { info90s } from "@/data/infos";

export default function Shows({ shows }) {
  const SEO = {
    title: "Classics TV | 90s TV Shows Channels",
    description: "Relive the 90s with iconic TV shows! From Friends to Seinfeld, these channels brought beloved sitcoms and dramas that still captivate audiences today.",

    openGraph: {
      title: "Classics TV | 90s TV Shows Channels",
      description: "Relive the 90s with iconic TV shows! From Friends to Seinfeld, these channels brought beloved sitcoms and dramas that still captivate audiences today.",
    },
  };

  const router = useRouter();

  const jsonLength = showsJson.shows.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [shows, setCatoons] = useState(showsJson.shows);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = shows[videoIndex + 1].videoId;
    const nextVideoTitle = shows[videoIndex + 1].title;

    router.push(
      `/90s/shows/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
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
              channelInfo="TV show channels from the 90s were a treasure trove of beloved programs that still hold a special place in our hearts today. From Friends to Seinfeld, they brought us some of the most iconic and memorable sitcoms of all time, as well as dramas, sci-fi, and other genres that captured our imaginations. These channels gave us a chance to laugh, cry, and escape into different worlds, as we followed the lives of our favorite characters and got lost in their stories. Whether you were a fan of classic shows or the latest new releases, there was always something to watch on TV show channels in the 90s. Today, these shows continue to be a source of joy and nostalgia for those who grew up with them, and a new generation of viewers continue to discover and enjoy them today."
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
  const shows = showsJson.shows;

  const videoId = shows[0].videoId;
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
      description: "Relive the 90s with iconic TV shows! From Friends to Seinfeld, these channels brought beloved sitcoms and dramas that still captivate audiences today.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description: "Relive the 90s with iconic TV shows! From Friends to Seinfeld, these channels brought beloved sitcoms and dramas that still captivate audiences today.",
      },
    };

    return {
      props: {
        shows,
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
