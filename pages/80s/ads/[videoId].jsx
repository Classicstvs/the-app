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

import { channels80s } from "../../../data/channelsList";
import adsJson from "../../../data/ads.json";

import { useRef } from "react";

import screenfull from "screenfull";
import { info80s } from "@/data/infos";

export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = adsJson.ads.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * adsJson.ads.length)
  );
  const [ads, setCatoons] = useState(adsJson.ads);
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

    const nextVideo = ads[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/80s/ads/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`,
      undefined,
      { scroll: false }
    );
  };

  useEffect(() => {
    if (videoTitle) {
      router.replace(`/videos/${videoId}/${videoTitle}`);
    }
  }, [videoId, videoTitle]);

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = ads[videoIndex - 1].videoId;
    const prevVideoTitle = ads[videoIndex - 1].title;

    router.push(
      `/80s/ads/${prevVideoId}?${encodeURIComponent(prevVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const SEO = {
    title: `Classics TV | 80s Commercials and Ads TV Channels | Now Playnig: ${title}`,
    description: "",

    openGraph: {
      title: "Classics TV | 80s Commercials and Ads TV Channels",
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

    setYear(ads[videoIndex].year);
  }, [videoTitle, ads, videoIndex]);

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
            videoId={ads[videoIndex].videoId}
            onEnded={playNext}
            onTitleChange={setTitle}
            volume={volume}
            player={player}
          />
          <Tv skin={skin} />
          <div className={styles.pageInfo}>
            <PageInfo info={info80s} years="80s" />
          </div>
        </div>
        <div className={styles.rightSecton}>
          <div className={styles.ad}>
            <Ad />
          </div>
          <div className={styles.channels}>
            <Channels channels={channels80s} />
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
              channelInfo="Advertisements from the 80s were iconic, with memorable jingles and celebrity endorsements used to appeal to emotions and shape brand perception. With television as the dominant medium for advertising, brands had to create ads that grabbed viewers' attention. As technology advanced, brands had to adapt to new media to stay relevant."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = adsJson.ads.map((ad) => ({
    params: { videoId: ad.videoId.toString() },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = adsJson.ads.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
