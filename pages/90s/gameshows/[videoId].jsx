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
import gameshowsJson from "../../../data/gameshows.json";

import { useRef } from "react";

import screenfull from "screenfull";
import { info90s } from "@/data/infos";


export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = gameshowsJson.gameshows.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * gameshowsJson.gameshows.length)
  );
  const [gameshows, setCatoons] = useState(gameshowsJson.gameshows);
  const [titleTag, setTitle] = useState("");
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

    const nextVideo = gameshows[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/gameshows/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = gameshows[videoIndex - 1].videoId;
    const prevVideoTitle = gameshows[videoIndex - 1].title;

    router.push(
      `/90s/gameshows/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Gameshows TV Channels | Now Playnig: ${title}`,
    description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",

    openGraph: {
      title: `Classics TV | 90s Gameshows TV Channels | Now Playnig: ${title}`,
      description: "Step back in time to 90s game show TV channels! From Jeopardy! to Wheel of Fortune, they offered iconic and innovative programs. Test your knowledge, compete, and win prizes.",
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

    setYear(gameshows[videoIndex].year);
  }, [videoTitle, gameshows, videoIndex]);

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
            videoId={gameshows[videoIndex].videoId}
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
              title={titleTag}
              jsonLength={jsonLength}
              year={year}
              channelInfo="Game show TV channels from the 90s were a fun and exciting way to spend an afternoon or evening. From Jeopardy! to Wheel of Fortune, they brought us some of the most iconic game shows of all time, as well as new and innovative programs that kept us guessing and entertained. These channels gave us a chance to test our knowledge and skills, compete against other contestants, and win prizes ranging from cash to cars. Whether you were a fan of classic quiz shows or modern game shows with a twist, there was always something to watch on game show TV channels in the 90s. Today, these channels may not be as prevalent as they once were, but their legacy lives on in the many game shows that continue to entertain and captivate audiences today."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = gameshowsJson.gameshows.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = gameshowsJson.gameshows.find(
    (ad) => ad.videoId === videoId
  );

  return {
    props: {
      title,
    },
  };
}
