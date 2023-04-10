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
import comedyJson from "../../../data/comedy.json";

import { useRef } from "react";

import screenfull from "screenfull";

export default function Video({ title }) {
  useScrollPosition();

  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = comedyJson.comedy.length;

  const [videoIndex, setVideoIndex] = useState(
    Math.floor(Math.random() * comedyJson.comedy.length)
  );
  const [comedy, setCatoons] = useState(comedyJson.comedy);
  // const [title, setTitle] = useState("");
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

    const nextVideo = comedy[randomIndex];
    if (!nextVideo) {
      console.error(`Error: Could not find video for index ${randomIndex}`);
      return;
    }

    const nextVideoId = nextVideo.videoId;
    const nextVideoTitle = nextVideo.title;

    router.push(
      `/90s/comedy/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`, undefined, { scroll: false }
    );
  };

  const playPrev = () => {
    setShowNoise(true);
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = comedy[videoIndex - 1].videoId;
    const prevVideoTitle = comedy[videoIndex - 1].title;

    router.push(
      `/90s/comedy/${prevVideoId}?${encodeURIComponent(prevVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  };

  const SEO = {
    title: `Classics TV | 90s Funniests Comedy TV Channels | Now Playnig: ${title}`,
    description: "",

    openGraph: {
      title: "Classics TV  | Classics TV | 90s Funniests Comedy TV Channels",
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

    setYear(comedy[videoIndex].year);
  }, [videoTitle, comedy, videoIndex]);

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
            videoId={comedy[videoIndex].videoId}
            onEnded={playNext}
            // onTitleChange={setTitle}
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
            channelInfo="The 90s was a decade of great comedy television channels, featuring some of the most beloved and iconic sitcoms of all time. Networks like NBC, ABC, and FOX brought us shows that made us laugh, cry, and think, with memorable characters and hilarious writing that still holds up today. From family-friendly sitcoms to edgier, more irreverent fare, these channels paved the way for the future of comedy television and left a lasting impact on popular culture."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export const getStaticPaths = async () => {
  const paths = comedyJson.comedy.map((ad) => ({
    params: {
      videoId: ad.videoId.toString(),
      videoTitle: ad.title.replace(/ /g, "-").toLowerCase(),
    },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const { videoId } = params;
  const { title } = comedyJson.comedy.find((ad) => ad.videoId === videoId);

  return {
    props: {
      title,
    },
  };
}
