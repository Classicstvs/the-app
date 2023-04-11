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
import sportsJson from "../../../data/sports.json";

import { useRef } from "react";

import screenfull from "screenfull";

export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = sportsJson.sports.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * sportsJson.sports.length)
  );
  const [sports, setCatoons] = useState(sportsJson.sports);
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

    const nextVideo = sports[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/sports/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`, undefined, { scroll: false }
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = sports[videoIndex - 1].videoId;
    const prevVideoTitle = sports[videoIndex - 1].title;

    router.push(
      `/90s/sports/${prevVideoId}?${encodeURIComponent(prevVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Sports TV Channels | Now Playnig: ${title}`,
    description: "",

    openGraph: {
      title: "Classics TV | 90s Sports TV Channels",
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

    setYear(sports[videoIndex].year);
  }, [videoTitle, sports, videoIndex]);

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
            videoId={sports[videoIndex].videoId}
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
            title={titleTab}
            jsonLength={jsonLength}
            year={year}
            channelInfo="Sports TV channels from the 90s were a dream come true for sports fans everywhere. From ESPN to Sky Sports, they brought us live coverage of some of the most exciting sports events of the decade, from the Olympics to the World Cup. These channels allowed us to cheer on our favorite teams and athletes from the comfort of our own homes, and provided us with expert analysis and commentary on the games. Whether you were a fan of basketball, football, or any other sport, there was always something to watch on sports TV channels in the 90s. Today, these channels continue to be an important part of the sports media landscape, providing us with access to live games, highlights, and expert analysis."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = sportsJson.sports.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = sportsJson.sports.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
