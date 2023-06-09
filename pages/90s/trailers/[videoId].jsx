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
import trailersJson from "../../../data/trailers.json";

import { useRef } from "react";

import screenfull from "screenfull";
import { info90s } from "@/data/infos";


export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = trailersJson.trailers.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * trailersJson.trailers.length)
  );
  const [trailers, setCatoons] = useState(trailersJson.trailers);
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

    const nextVideo = trailers[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/trailers/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = trailers[videoIndex - 1].videoId;
    const prevVideoTitle = trailers[videoIndex - 1].title;

    router.push(
      `/90s/trailers/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Trailers on TV Channels | Now Playnig: ${title}`,
    description: "Get a sneak peek of the latest movies with 90s trailer TV channels, featuring blockbusters, indie films, and cult classics. Make informed choices and get excited for the next big movie release.",

    openGraph: {
      title: `Classics TV | 90s Trailers on TV Channels | Now Playnig: ${title}`,
      description: "Get a sneak peek of the latest movies with 90s trailer TV channels, featuring blockbusters, indie films, and cult classics. Make informed choices and get excited for the next big movie release.",
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

    setYear(trailers[videoIndex].year);
  }, [videoTitle, trailers, videoIndex]);

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
            videoId={trailers[videoIndex].videoId}
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
              channelInfo="Trailer TV channels from the 90s were a go-to destination for movie fans who wanted to catch a glimpse of the latest releases. From previews of big-budget blockbusters to indie films and cult classics, these channels provided us with a chance to see what was coming up at the cinema. They also gave us a sense of excitement and anticipation, as we eagerly awaited the release of the next big movie. These channels provided us with a valuable service, as they helped us make informed choices about what to see at the theater. Whether you were a fan of action, romance, comedy, or horror, there was always something to watch on trailer TV channels in the 90s. Even today, trailers remain an essential part of the movie-going experience, and those from the 90s continue to hold a special place in the hearts of movie fans."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = trailersJson.trailers.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = trailersJson.trailers.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
