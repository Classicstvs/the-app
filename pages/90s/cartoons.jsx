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
import cartoonsJson from "../../data/cartoons.json";

export default function Cartoons() {
  const SEO = {
    title: "Classics TV | 90s Cartoons TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Cartoons TV Channels",
      description: "",
    },
  };

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
            videoId={cartoons[videoIndex].videoId}
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
            channelInfo="Cartoon TV channels from the 90s were a paradise for kids and adults alike who loved animated shows. From classic series like Looney Tunes and Tom and Jerry to modern hits like Animaniacs and Rugrats, they brought us some of the most memorable and iconic cartoon characters of all time. These channels provided us with a chance to escape into different worlds, filled with adventure, humor, and heartwarming stories that taught us important lessons. Whether you were a fan of superheroes, talking animals, or mischievous kids, there was always something to watch on cartoon TV channels in the 90s. Even today, these shows continue to hold a special place in the hearts of those who grew up with them, and they remain a beloved part of popular culture around the world."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
