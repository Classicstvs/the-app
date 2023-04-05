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
import othersJson from "../../../data/others.json";

import { useRef } from "react";

import screenfull from "screenfull";

export default function Video() {
  useScrollPosition()
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = othersJson.others.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * othersJson.others.length)
  );
  const [others, setCatoons] = useState(othersJson.others);
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


  const playNext = () => {
    setShowNoise(true);
    const randomIndex = Math.floor(Math.random() * jsonLength);
    setVideoIndex(randomIndex);

    const nextVideo = others[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/others/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = others[videoIndex - 1].videoId;
    const prevVideoTitle = others[videoIndex - 1].title;

    router.push(
      `/90s/others/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const SEO = {
    title: `Classics TV | TV Others 90s Channels | Now Playnig: ${title}`,
    description: "",

    openGraph: {
      title: "Classics TV | TV Others 90s Channels",
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

    setYear(others[videoIndex].year);
  }, [videoTitle, others, videoIndex]);

  useEffect(() => {
    if (showNoise) {
      const timer = setTimeout(() => {
        setShowNoise(false);
      }, 3000);

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
            videoId={others[videoIndex].videoId}
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
            channelInfo="Other TV channels from the 90s covered a wide variety of programming, catering to different interests and tastes. From educational channels like Discovery and National Geographic to lifestyle channels like HGTV and Food Network, there was always something to watch for viewers looking for something specific. These channels provided us with a wealth of information and entertainment, from documentaries on science and history to cooking shows and home renovation programs. They also helped us learn new skills and explore new interests. Whether you were a fan of travel, fashion, or gardening, there was always something to watch on other TV channels in the 90s. Even today, these channels continue to be a part of our television landscape, offering viewers a diverse range of programming and catering to a wide variety of interests."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
