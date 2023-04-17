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
import specialsJson from "../../data/specials.json";
import { info90s } from "@/data/infos";

export default function Specials({ specials }) {
  const SEO = {
    title: "Classics TV | 90s Specials TV Channels",
    description:
      "Experience the groundbreaking and influential specials TV channels of the 90s, featuring live coverage of significant moments in pop culture and world history. Witness history in the making and exclusive behind-the-scenes looks.",

    openGraph: {
      title: "Classics TV | 90s Specials TV Channels",
      description:
        "Experience the groundbreaking and influential specials TV channels of the 90s, featuring live coverage of significant moments in pop culture and world history. Witness history in the making and exclusive behind-the-scenes looks.",
    },
  };

  const router = useRouter();

  const jsonLength = specialsJson.specials.length;

  const [videoIndex, setVideoIndex] = useState(0);
  // const [specials, setCatoons] = useState(specialsJson.specials);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = specials[videoIndex + 1].videoId;
    const nextVideoTitle = specials[videoIndex + 1].title;

    router.push(
      `/90s/specials/${nextVideoId}?${encodeURIComponent(
        nextVideoTitle
      ).replace(/%20/g, "")}`,
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
              channelInfo="Specials TV channels from the 90s were a platform for some of the most groundbreaking and influential programs of the decade. From awards shows like the Oscars and the Grammys to special events like Live Aid and the Olympics, they brought us live coverage of some of the most significant moments in pop culture and world history. These channels provided us with a chance to witness history in the making, from the fall of the Berlin Wall to the inauguration of new presidents. They also brought us exclusive interviews and behind-the-scenes looks at the worlds of politics, entertainment, and sports. Whether you were a fan of music, sports, or current events, there was always something to watch on specials TV channels in the 90s. Even today, these programs continue to be a part of our cultural conversation, and they remain an important part of the television landscape."
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
  const specials = specialsJson.specials;

  const videoId = specials[0].videoId;
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
        "Experience the groundbreaking and influential specials TV channels of the 90s, featuring live coverage of significant moments in pop culture and world history. Witness history in the making and exclusive behind-the-scenes looks.",
      openGraph: {
        title: `Classics TV | ${channelTitle} ${title}`,
        description:
          "Experience the groundbreaking and influential specials TV channels of the 90s, featuring live coverage of significant moments in pop culture and world history. Witness history in the making and exclusive behind-the-scenes looks.",
      },
    };

    return {
      props: {
        specials,
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
