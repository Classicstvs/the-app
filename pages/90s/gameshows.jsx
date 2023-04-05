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
import gameshowsJson from "../../data/gameshows.json";

export default function Gameshows() {
  const SEO = {
    title: "Classics TV | 90s Gameshows TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Gameshows TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = gameshowsJson.gameshows.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [gameshows, setCatoons] = useState(gameshowsJson.gameshows);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = gameshows[videoIndex + 1].videoId;
    const nextVideoTitle = gameshows[videoIndex + 1].title;

    router.push(
      `/90s/gameshows/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Game show TV channels from the 90s were a fun and exciting way to spend an afternoon or evening. From Jeopardy! to Wheel of Fortune, they brought us some of the most iconic game shows of all time, as well as new and innovative programs that kept us guessing and entertained. These channels gave us a chance to test our knowledge and skills, compete against other contestants, and win prizes ranging from cash to cars. Whether you were a fan of classic quiz shows or modern game shows with a twist, there was always something to watch on game show TV channels in the 90s. Today, these channels may not be as prevalent as they once were, but their legacy lives on in the many game shows that continue to entertain and captivate audiences today."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}