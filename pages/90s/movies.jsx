import { useEffect, useState } from "react";
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
import moviesJson from "../../data/movies.json";
import { info90s } from "@/data/infos";

export default function Movies({movies}) {
  const SEO = {
    title: "Classics TV | 90s Best Movies TV Channels ",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Best Movies TV Channels ",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = moviesJson.movies.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [movies, setCatoons] = useState(moviesJson.movies);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = movies[videoIndex + 1].videoId;
    const nextVideoTitle = movies[videoIndex + 1].title;

    router.push(
      `/90s/movies/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`, undefined, { scroll: false }
    );
  };



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
          <PageInfo info={info90s} years="90s"/>
        </div>
        <div className={styles.rightSecton}>
          <Ad />
          <Channels channels={channels} />
          <Controls
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


export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const movies = moviesJson.movies;

  const videoId = movies[0].videoId;
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
        movies,
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
