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
import othersJson from "../../data/others.json";

export default function Others({others}) {
  const SEO = {
    title: "Classics TV | Other 90s TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | Other 90s TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = othersJson.others.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [others, setCatoons] = useState(othersJson.others);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = others[videoIndex + 1].videoId;
    const nextVideoTitle = others[videoIndex + 1].title;

    router.push(
      `/90s/others/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Other TV channels from the 90s covered a wide variety of programming, catering to different interests and tastes. From educational channels like Discovery and National Geographic to lifestyle channels like HGTV and Food Network, there was always something to watch for viewers looking for something specific. These channels provided us with a wealth of information and entertainment, from documentaries on science and history to cooking shows and home renovation programs. They also helped us learn new skills and explore new interests. Whether you were a fan of travel, fashion, or gardening, there was always something to watch on other TV channels in the 90s. Even today, these channels continue to be a part of our television landscape, offering viewers a diverse range of programming and catering to a wide variety of interests."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}


export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const others = othersJson.others;

  const videoId = others[0].videoId;
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
        others,
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
