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

import useScrollPosition from "@/hooks/useScrollPosition";

import { channels } from "../../../data/channelsList";
import talkshowsJson from "../../../data/talkshows.json";

import { useRef } from "react";

import screenfull from "screenfull";

export default function Video() {
  useScrollPosition()
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = talkshowsJson.talkshows.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * talkshowsJson.talkshows.length)
  );
  const [talkshows, setCatoons] = useState(talkshowsJson.talkshows);
  const [title, setTitle] = useState("");
  const [volume, setVolume] = useState(0.4);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [year, setYear] = useState(null);
  const [showNoise, setShowNoise] = useState(true);
  const [skin, setSkin] = useState(false);

  //Toggle skin
  const toggleSkin = () => {
    setSkin(!skin);
  };

  //Change channels
  const playNext = () => {
    setShowNoise(true);
    const randomIndex = Math.floor(Math.random() * jsonLength);
    setVideoIndex(randomIndex);

    const nextVideo = talkshows[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/talkshows/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = talkshows[videoIndex - 1].videoId;
    const prevVideoTitle = talkshows[videoIndex - 1].title;

    router.push(
      `/90s/talkshows/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Talkshows TV Channels | Now Playnig: ${title}`,
    description: "",

    openGraph: {
      title: "Classics TV | 90s Talkshows TV Channels",
      description: "",
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

    setYear(talkshows[videoIndex].year);
  }, [videoTitle, talkshows, videoIndex]);

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
            videoId={talkshows[videoIndex].videoId}
            onEnded={playNext}
            onTitleChange={setTitle}
            volume={volume}
            player={player}
          />
          <Tv skin={skin} />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls
            playPrev={playPrev}
            playNext={playNext}
            videoIndex={videoIndex}
            increaseVolume={increaseVolume}
            decreaseVolume={decreaseVolume}
            handleClickFullscreen={handleClickFullscreen}
            toggleSkin={toggleSkin}
          />
          <PlayInfo
            title={title}
            jsonLength={jsonLength}
            year={year}
            channelInfo="Talk show TV channels from the 90s were a platform for some of the most influential and entertaining personalities of the decade. From Oprah to Jerry Springer, they brought us a wide range of guests and topics, from hard-hitting political discussions to lighthearted celebrity interviews. These channels gave us a chance to hear diverse perspectives and engage in debates and conversations that were both engaging and informative. They also provided us with a window into the lives of the rich and famous, as we watched our favorite celebrities reveal intimate details of their personal lives on air. Today, talk show TV channels continue to be a popular format, but those from the 90s remain a landmark in the history of television and popular culture."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
