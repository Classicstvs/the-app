import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../../styles/allChannels.module.css";

import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";

import { channels } from "../../data/channelsList";
import cartoonsJson from "../../data/cartoons.json";

export default function Cartoons() {
  const router = useRouter();

  const [videoIndex, setVideoIndex] = useState(0);
  const [cartoons, setCatoons] = useState(cartoonsJson.cartoons);

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = news[videoIndex + 1].videoId;
    const nextVideoTitle = news[videoIndex + 1].title;

    router.push(`/90s/news/${nextVideoId}`);
  };

  const playPrev = () => {
    setVideoIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <VideoPlayer
            videoId={cartoons[videoIndex].videoId}
            onEnd={playNext}
          />
          <Tv />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls />
          <PlayInfo />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
