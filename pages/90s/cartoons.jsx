import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import axios from "axios";

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
import cartoonsJson from "../../data/cartoons.json";

export default function Cartoons({cartoons}) {
  const SEO = {
    title: "Classics TV | 90s Favourites Cartoons TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Favourites Cartoons TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = cartoonsJson.cartoons.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [cartoons, setCatoons] = useState(cartoonsJson.cartoons);
  const [title, setTitle] = useState("");

  const playNext = useCallback(() => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = cartoons[videoIndex + 1].videoId;
    const nextVideoTitle = cartoons[videoIndex + 1].title;

    router.push(
      `/90s/cartoons/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`
    );
  }, [cartoons, router, videoIndex]);



  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);
  
    return () => clearTimeout(timer);
  }, [playNext]);
  

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


export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const cartoons = cartoonsJson.cartoons;

  const videoId = cartoons[0].videoId;
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
    );
    const title = response.data.items[0].snippet.title;
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "");
    const channelTitle = response.data.items[0].snippet.channelTitle;

    const SEO = {
      title: `Classics TV | ${channelTitle} ${title}`,
      description: "",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description: "",
      },
    };

    return {
      props: {
        cartoons,
        video: {
          url,
          title,
        },
        SEO,
        channelInfo: {
          title: channelTitle,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
