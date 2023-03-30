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

  const jsonLength = cartoonsJson.cartoons.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [cartoons, setCatoons] = useState(cartoonsJson.cartoons);
  const [title, setTitle] = useState("");


  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = cartoons[videoIndex + 1].videoId;
    const nextVideoTitle = cartoons[videoIndex + 1].title;

    router.push(
      `/90s/cartoons/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  // const playPrev = () => {
  //   setVideoIndex((prevIndex) => prevIndex - 1);
  // };


  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          <VideoPlayer
            videoId={cartoons[videoIndex].videoId}
            onEnd={playNext}
            onTitleChange={setTitle}
          />
          <Tv />
          <PageInfo />
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls
            // playPrev={playPrev}
            playNext={playNext}
          />
          <PlayInfo
            titleTick="You can change the channels, Up and Down."
            jsonLength={jsonLength}
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
