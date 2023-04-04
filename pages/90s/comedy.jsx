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
import comedyJson from "../../data/comedy.json";

export default function Comedy() {
  const SEO = {
    title: "Classics Tv | 90s Comedy Channels",
    description: "",

    openGraph: {
      title: "Classics Tv | 90s Comedy Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = comedyJson.comedy.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [comedy, setCatoons] = useState(comedyJson.comedy);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = comedy[videoIndex + 1].videoId;
    const nextVideoTitle = comedy[videoIndex + 1].title;

    router.push(
      `/90s/comedy/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="The 90s was a decade of great comedy television channels, featuring some of the most beloved and iconic sitcoms of all time. Networks like NBC, ABC, and FOX brought us shows that made us laugh, cry, and think, with memorable characters and hilarious writing that still holds up today. From family-friendly sitcoms to edgier, more irreverent fare, these channels paved the way for the future of comedy television and left a lasting impact on popular culture."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
