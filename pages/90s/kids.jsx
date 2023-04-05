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
import kidsJson from "../../data/kids.json";

export default function Kids() {
  const SEO = {
    title: "Classics TV | 90s Kids TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Kids TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = kidsJson.kids.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [kids, setCatoons] = useState(kidsJson.kids);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = kids[videoIndex + 1].videoId;
    const nextVideoTitle = kids[videoIndex + 1].title;

    router.push(
      `/90s/kids/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Kids TV channels from the 90s were a wonderland of fantastic shows that children loved to watch. From beloved classics like Pokemon and Sailor Moon to iconic series like Teenage Mutant Ninja Turtles and The Animaniacs, they filled our afternoons with adventure, humor, and excitement. Even today, these shows remain a source of joy and nostalgia for adults who grew up with them and continue to delight a new generation of children."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
