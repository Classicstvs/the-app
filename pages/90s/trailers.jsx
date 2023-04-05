import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { NextSeo } from "next-seo";

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
import trailersJson from "../../data/trailers.json";

export default function Trailers() {
  const SEO = {
    title: "Classics TV | 90s Trailers on TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Trailers on TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = trailersJson.trailers.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [trailers, setCatoons] = useState(trailersJson.trailers);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = trailers[videoIndex + 1].videoId;
    const nextVideoTitle = trailers[videoIndex + 1].title;

    router.push(
      `/90s/trailers/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`
    );
  };

  // const playPrev = () => {
  //   setVideoIndex((prevIndex) => prevIndex - 1);
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [videoIndex]);

  return (
    <main className={styles.main}>
      <NextSeo {...SEO} />
      <div className={styles.mainWrapper}>
        <div className={styles.leftSecton}>
          {/* <VideoPlayer
            videoId={trailers[videoIndex].videoId}
            onEnd={playNext}
            onTitleChange={setTitle}
          /> */}
          <Image
            src="/images/noize.gif"
            alt="TV Noise"
            width={615}
            height={460}
            className={styles.noise}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
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
            jsonLength={jsonLength}
            channelInfo="Trailer TV channels from the 90s were a go-to destination for movie fans who wanted to catch a glimpse of the latest releases. From previews of big-budget blockbusters to indie films and cult classics, these channels provided us with a chance to see what was coming up at the cinema. They also gave us a sense of excitement and anticipation, as we eagerly awaited the release of the next big movie. These channels provided us with a valuable service, as they helped us make informed choices about what to see at the theater. Whether you were a fan of action, romance, comedy, or horror, there was always something to watch on trailer TV channels in the 90s. Even today, trailers remain an essential part of the movie-going experience, and those from the 90s continue to hold a special place in the hearts of movie fans."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
