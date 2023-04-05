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
import musicJson from "../../data/music.json";

export default function Music() {
  const SEO = {
    title: "Classics TV | 90s Music TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Music TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = musicJson.music.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [music, setCatoons] = useState(musicJson.music);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = music[videoIndex + 1].videoId;
    const nextVideoTitle = music[videoIndex + 1].title;

    router.push(
      `/90s/music/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Music TV channels from the 90s were a revolution in the way we consumed music and entertainment. From MTV to VH1, they brought us music videos, live performances, and interviews with some of the biggest names in the music industry. These channels allowed us to discover new artists, stay up-to-date with the latest music trends, and connect with other fans who shared our love of music. Whether you were a fan of rock, pop, hip hop, or any other genre, there was always something to watch on music TV channels in the 90s. They also gave us a glimpse into the lifestyles of our favorite musicians, and helped shape the fashion and cultural trends of the decade. Today, music channels may have evolved and expanded, but those from the 90s remain an iconic part of the music and entertainment industry."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}