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
import kidsJson from "../../data/kids.json";
import { info90s } from "@/data/infos";

export default function Kids({ kids }) {
  const SEO = {
    title: "Classics TV | 90s Kids TV Channels",
    description:
      "Rediscover the magic of 90s kids TV! From Pokemon to Animaniacs, these shows filled afternoons with adventure and excitement. Relive fond memories or share with a new generation.",

    openGraph: {
      title: "Classics TV | 90s Kids TV Channels",
      description:
        "Rediscover the magic of 90s kids TV! From Pokemon to Animaniacs, these shows filled afternoons with adventure and excitement. Relive fond memories or share with a new generation.",
    },
  };

  const router = useRouter();

  const jsonLength = kidsJson.kids.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [kids, setCatoons] = useState(kidsJson.kids);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = kids[videoIndex + 1].videoId;
    const nextVideoTitle = kids[videoIndex + 1].title;

    router.push(
      `/90s/kids/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
        /%20/g,
        ""
      )}`,
      undefined,
      { scroll: false }
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
              channelInfo="Kids TV channels from the 90s were a wonderland of fantastic shows that children loved to watch. From beloved classics like Pokemon and Sailor Moon to iconic series like Teenage Mutant Ninja Turtles and The Animaniacs, they filled our afternoons with adventure, humor, and excitement. Even today, these shows remain a source of joy and nostalgia for adults who grew up with them and continue to delight a new generation of children."
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
  const kids = kidsJson.kids;

  const videoId = kids[0].videoId;
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
        "Rediscover the magic of 90s kids TV! From Pokemon to Animaniacs, these shows filled afternoons with adventure and excitement. Relive fond memories or share with a new generation.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description:
          "Rediscover the magic of 90s kids TV! From Pokemon to Animaniacs, these shows filled afternoons with adventure and excitement. Relive fond memories or share with a new generation.",
      },
    };

    return {
      props: {
        kids,
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
