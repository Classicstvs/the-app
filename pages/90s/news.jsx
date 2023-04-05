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
import newsJson from "../../data/news.json";

export default function News() {
  const SEO = {
    title: "Classics TV | 90s News TV Channels",
    description: "",
    openGraph: {
      title: "Classics TV | 90s News TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = newsJson.news.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [news, setCatoons] = useState(newsJson.news);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = news[videoIndex + 1].videoId;
    const nextVideoTitle = news[videoIndex + 1].title;

    router.push(
      `/90s/news/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="News channels from the 90s were a vital source of information for people all around the world. From CNN to BBC, they provided us with up-to-date coverage of major events, from wars and natural disasters to politics and entertainment. These channels helped us stay informed about the world around us and shaped our understanding of current affairs. They also gave us access to a wide range of perspectives and voices, expanding our understanding of global events and issues. Today, we still rely on news channels to keep us informed, but the channels from the 90s remain an important part of the history of journalism and media."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
