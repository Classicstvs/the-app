import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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

export default function Shows() {
  const SEO = {
    title: "Classics TV | 90s TV Shows Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s TV Shows Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = showsJson.shows.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [shows, setCatoons] = useState(showsJson.shows);
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

  // const playPrev = () => {
  //   setVideoIndex((prevIndex) => prevIndex - 1);
  // };

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
          {/* <VideoPlayer
            videoId={cartoons[videoIndex].videoId}
            onEnd={playNext}
            onTitleChange={setTitle}
          /> */}
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
            // playPrev={playPrev}
            playNext={playNext}
          />
          <PlayInfo
            jsonLength={jsonLength}
            channelInfo="TV show channels from the 90s were a treasure trove of beloved programs that still hold a special place in our hearts today. From Friends to Seinfeld, they brought us some of the most iconic and memorable sitcoms of all time, as well as dramas, sci-fi, and other genres that captured our imaginations. These channels gave us a chance to laugh, cry, and escape into different worlds, as we followed the lives of our favorite characters and got lost in their stories. Whether you were a fan of classic shows or the latest new releases, there was always something to watch on TV show channels in the 90s. Today, these shows continue to be a source of joy and nostalgia for those who grew up with them, and a new generation of viewers continue to discover and enjoy them today."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}