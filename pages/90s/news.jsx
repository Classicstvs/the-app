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
import Donate from "@/components/donate/Donate";

import { channels } from "../../data/channelsList";
import newsJson from "../../data/news.json";
import { info90s } from "@/data/infos";


export default function News({ news }) {
  const SEO = {
    title: "Classics TV | 90s News TV Channels",
    description:
      "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",

    openGraph: {
      title: "Classics TV | 90s News TV Channels",
      description:
        "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",
    },
  };

  const router = useRouter();

  const jsonLength = newsJson.news.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [news, setCatoons] = useState(newsJson.news);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = news[videoIndex + 1].videoId;
    const nextVideoTitle = news[videoIndex + 1].title;

    router.push(
      `/90s/news/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`,
      undefined,
      {scroll: false }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      playNext();
    }, 2000);

    return () => clearTimeout(timer);
  });

  return (
    <main className={styles.main}>
      <Donate />
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
          <div className={styles.pageInfo}>
            <PageInfo info={info90s} years="90s" />
          </div>
        </div>
        <div className={styles.rightSecton}>
          <div className={styles.ad}>
            <Ad />
          </div>
          <div className={styles.channels}>
            <Channels channels={channels} />
          </div>
          <div className={styles.controls}>
            <Controls playNext={playNext} />
          </div>
          <div className={styles.playInfo}>
            <PlayInfo
              jsonLength={jsonLength}
              channelInfo="News channels from the 90s were a vital source of information for people all around the world. From CNN to BBC, they provided us with up-to-date coverage of major events, from wars and natural disasters to politics and entertainment. These channels helped us stay informed about the world around us and shaped our understanding of current affairs. They also gave us access to a wide range of perspectives and voices, expanding our understanding of global events and issues. Today, we still rely on news channels to keep us informed, but the channels from the 90s remain an important part of the history of journalism and media."
            />
          </div>
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  const news = newsJson.news;

  const videoId = news[0].videoId;
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
      description:
        "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description:
          "Stay informed with 90s news channels! From CNN to BBC, they covered major events and shaped our understanding of the world. Discover their vital role in journalism and media history.",
      },
    };

    return {
      props: {
        news,
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
