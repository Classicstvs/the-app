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
import musicJson from "../../../data/music.json";

import { useRef } from "react";

import screenfull from "screenfull";
import { info90s } from "@/data/infos";


export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = musicJson.music.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * musicJson.music.length)
  );
  const [music, setCatoons] = useState(musicJson.music);
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

    const nextVideo = music[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/music/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = music[videoIndex - 1].videoId;
    const prevVideoTitle = music[videoIndex - 1].title;

    router.push(
      `/90s/music/${prevVideoId}?${encodeURIComponent(prevVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Greatests Music TV Channels | Now Playnig: ${title}`,
    description: "Relive the music revolution of the 90s with iconic music TV channels, bringing us live performances, interviews, and fashion trends. Discover the biggest names in music and connect with other fans",

    openGraph: {
      title: `Classics TV | 90s Greatests Music TV Channels | Now Playnig: ${title}`,
      description: "Relive the music revolution of the 90s with iconic music TV channels, bringing us live performances, interviews, and fashion trends. Discover the biggest names in music and connect with other fans",
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

    setYear(music[videoIndex].year);
  }, [videoTitle, music, videoIndex]);

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
            videoId={music[videoIndex].videoId}
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
              channelInfo="Music TV channels from the 90s were a revolution in the way we consumed music and entertainment. From MTV to VH1, they brought us music videos, live performances, and interviews with some of the biggest names in the music industry. These channels allowed us to discover new artists, stay up-to-date with the latest music trends, and connect with other fans who shared our love of music. Whether you were a fan of rock, pop, hip hop, or any other genre, there was always something to watch on music TV channels in the 90s. They also gave us a glimpse into the lifestyles of our favorite musicians, and helped shape the fashion and cultural trends of the decade. Today, music channels may have evolved and expanded, but those from the 90s remain an iconic part of the music and entertainment industry."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = musicJson.music.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = musicJson.music.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
