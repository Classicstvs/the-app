import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";

import styles from "../../../styles/allChannels.module.css";

import Tv from "../../../components/tv/Tv";
import Channels from "../../../components/channels/Channels";
import Ad from "../../../components/ad/Ad";
import Controls from "../../../components/controls/Controls";
import PlayInfo from "../../../components/playInfo/PlayInfo";
import PageInfo from "../../../components/pageInfo/PageInfo";
import CardsInfo from "../../../components/cardsInfo/CardsInfo";

import { channels } from "../../../data/channelsList";
import cartoonsJson from "../../../data/cartoons.json";

export default function Video() {
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  const jsonLength = cartoonsJson.cartoons.length;

  useEffect(() => {
    if (videoTitle) {
      document.title = videoTitle;
    }
  }, [videoTitle]);

  const [videoIndex, setVideoIndex] = useState(0);
  const [cartoons, setCatoons] = useState(cartoonsJson.cartoons);
  const [title, setTitle] = useState("")

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

  const playPrev = () => {
    setVideoIndex((prevIndex) => prevIndex - 1);

    const prevVideoId = cartoons[videoIndex - 1].videoId;
    const prevVideoTitle = cartoons[videoIndex - 1].title;

    router.push(
      `/90s/cartoons/${prevVideoId}?${encodeURIComponent(
        prevVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

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
          <Controls playPrev={playPrev} playNext={playNext} videoIndex={videoIndex}/>
          <PlayInfo title={title} jsonLength={jsonLength}/>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
