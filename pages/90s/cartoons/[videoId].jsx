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
import cartoonsJson from "../../../data/cartoons.json";
import { info90s } from "@/data/infos";

import { useRef } from "react";

import screenfull from "screenfull";


export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = cartoonsJson.cartoons.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * cartoonsJson.cartoons.length)
  );
  const [cartoons, setCartoons] = useState(cartoonsJson.cartoons);
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

    const nextVideo = cartoons[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/cartoons/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = cartoons[videoIndex - 1].videoId;
    const prevVideoTitle = cartoons[videoIndex - 1].title;

    router.push(
      `/90s/cartoons/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Favourites Cartoons TV Channels | Now Playnig: ${title}`,
    description: "Relive your childhood memories with iconic cartoon TV channels from the 90s! Escape to different worlds filled with adventure, humor and heartwarming stories.",

    openGraph: {
      title: `Classics TV | 90s Favourites Cartoons TV Channels | Now Playnig: ${title}`,
      description: "Relive your childhood memories with iconic cartoon TV channels from the 90s! Escape to different worlds filled with adventure, humor and heartwarming stories.",
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

    setYear(cartoons[videoIndex].year);
  }, [videoTitle, cartoons, videoIndex]);

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
            //  videoId={videoId}
            videoId={cartoons[videoIndex].videoId}
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
              channelInfo="Cartoon TV channels from the 90s were a paradise for kids and adults alike who loved animated shows. From classic series like Looney Tunes and Tom and Jerry to modern hits like Animaniacs and Rugrats, they brought us some of the most memorable and iconic cartoon characters of all time. These channels provided us with a chance to escape into different worlds, filled with adventure, humor, and heartwarming stories that taught us important lessons. Whether you were a fan of superheroes, talking animals, or mischievous kids, there was always something to watch on cartoon TV channels in the 90s. Even today, these shows continue to hold a special place in the hearts of those who grew up with them, and they remain a beloved part of popular culture around the world."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = cartoonsJson.cartoons.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = cartoonsJson.cartoons.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
      videoId,
    },
  };
}
