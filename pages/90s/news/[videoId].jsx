import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { NextSeo } from "next-seo";

import Image from "next/image";

import VideoPlayer from "@/components/videoPlayer/VideoPlayer";

import styles from "../../../styles/allChannels.module.css";

import Tv from "../../../components/tv/Tv";
import Channels from "../../../components/channels/Channels";
import Ad from "../../../components/ad/Ad";
import Controls from "../../../components/controls/Controls";
import PlayInfo from "../../../components/playInfo/PlayInfo";
import PageInfo from "../../../components/pageInfo/PageInfo";
import CardsInfo from "../../../components/cardsInfo/CardsInfo";
import Donate from "@/components/donate/Donate";

import useScrollPosition from "@/hooks/useScrollPosition";

import { channels } from "../../../data/channelsList";
import newsJson from "../../../data/news.json";

import { useRef } from "react";

import screenfull from "screenfull";
import { info90s } from "@/data/infos";


export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = newsJson.news.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * newsJson.news.length)
  );
  const [news, setCatoons] = useState(newsJson.news);
  const [titleTab, setTitle] = useState("");
  const [volume, setVolume] = useState(0.4);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  const [year, setYear] = useState(null);
  const [showNoise, setShowNoise] = useState(true);
  const [skin, setSkin] = useState(false);

  //Toggle skin
  const toggleSkin = () => {
    setSkin(!skin);
  };

  const playNext = () => {
    setShowNoise(true);
    const randomIndex = Math.floor(Math.random() * jsonLength);
    setVideoIndex(randomIndex);

    const nextVideo = news[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/news/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = news[videoIndex - 1].videoId;
    const prevVideoTitle = news[videoIndex - 1].title;

    router.push(
      `/90s/news/${prevVideoId}?${encodeURIComponent(prevVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s News TV Channels | Now Playnig: ${title}`,
    description: "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",

    openGraph: {
      title: `Classics TV | 90s News TV Channels | Now Playnig: ${title}`,
      description: "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",
    },
  };

  //Set Volume
  const increaseVolume = () => {
    setVolume((prevVolume) => {
      const newVolume = prevVolume + 0.1;
      return newVolume > 1 ? 1 : newVolume;
    });
  };

  const decreaseVolume = () => {
    setVolume((prevVolume) => {
      const newVolume = prevVolume - 0.1;
      return newVolume < 0 ? 0 : newVolume;
    });
  };

  //Set Fullscreen
  const player = useRef(null);
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(player.current.wrapper);
    }
  };

  useEffect(() => {
    if (videoTitle) {
      document.title = videoTitle;
    }

    setYear(news[videoIndex].year);
  }, [videoTitle, news, videoIndex]);

  useEffect(() => {
    if (showNoise) {
      const timer = setTimeout(() => {
        setShowNoise(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showNoise]);

  return (
    <main className={styles.main}>
      <Donate />
      <NextSeo {...SEO} />
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <Image
            src="/images/noize.gif"
            alt="TV Noise"
            width={615}
            height={460}
            className={`${styles.noise} ${
              showNoise ? styles.show : styles.hide
            }`}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <VideoPlayer
            videoId={news[videoIndex].videoId}
            onEnded={playNext}
            onTitleChange={setTitle}
            volume={volume}
            player={player}
          />
          <Tv skin={skin} />
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
            <Controls
              playPrev={playPrev}
              playNext={playNext}
              videoIndex={videoIndex}
              increaseVolume={increaseVolume}
              decreaseVolume={decreaseVolume}
              handleClickFullscreen={handleClickFullscreen}
              toggleSkin={toggleSkin}
            />
          </div>
          <div className={styles.playInfo}>
            <PlayInfo
              title={titleTab}
              jsonLength={jsonLength}
              year={year}
              channelInfo="News channels from the 90s were a vital source of information for people all around the world. From CNN to BBC, they provided us with up-to-date coverage of major events, from wars and natural disasters to politics and entertainment. These channels helped us stay informed about the world around us and shaped our understanding of current affairs. They also gave us access to a wide range of perspectives and voices, expanding our understanding of global events and issues. Today, we still rely on news channels to keep us informed, but the channels from the 90s remain an important part of the history of journalism and media."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = newsJson.news.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = newsJson.news.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
