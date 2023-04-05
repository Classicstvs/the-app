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
import sportsJson from "../../data/sports.json";

export default function Sports() {
  const SEO = {
    title: "Classics TV | 90s Sports TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Sports TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = sportsJson.sports.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [sports, setCatoons] = useState(sportsJson.sports);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = sports[videoIndex + 1].videoId;
    const nextVideoTitle = sports[videoIndex + 1].title;

    router.push(
      `/90s/sports/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Sports TV channels from the 90s were a dream come true for sports fans everywhere. From ESPN to Sky Sports, they brought us live coverage of some of the most exciting sports events of the decade, from the Olympics to the World Cup. These channels allowed us to cheer on our favorite teams and athletes from the comfort of our own homes, and provided us with expert analysis and commentary on the games. Whether you were a fan of basketball, football, or any other sport, there was always something to watch on sports TV channels in the 90s. Today, these channels continue to be an important part of the sports media landscape, providing us with access to live games, highlights, and expert analysis."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
