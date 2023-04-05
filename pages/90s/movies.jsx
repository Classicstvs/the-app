import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { NextSeo } from "next-seo";

import styles from "../../styles/allChannels.module.css";

import Tv from "../../components/tv/Tv";
import Channels from "../../components/channels/Channels";
import Ad from "../../components/ad/Ad";
import Controls from "../../components/controls/Controls";
import PlayInfo from "../../components/playInfo/PlayInfo";
import PageInfo from "../../components/pageInfo/PageInfo";
import CardsInfo from "../../components/cardsInfo/CardsInfo";

import { channels } from "../../data/channelsList";
import moviesJson from "../../data/movies.json";

export default function Movies() {
  const SEO = {
    title: "Classics TV | 90s Movies TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Movies TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = moviesJson.movies.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [movies, setCatoons] = useState(moviesJson.movies);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = movies[videoIndex + 1].videoId;
    const nextVideoTitle = movies[videoIndex + 1].title;

    router.push(
      `/90s/movies/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
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
            channelInfo="Movie TV channels from the 90s were a paradise for cinephiles and movie lovers of all ages. From the thrilling action movies like Terminator 2 and Die Hard to the heartwarming family films like Home Alone and The Lion King, there was something for everyone. These channels brought the magic of the big screen into our homes, allowing us to experience some of the greatest movies of all time whenever we wanted. Today, these films remain timeless classics that continue to entertain and captivate audiences around the world."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
