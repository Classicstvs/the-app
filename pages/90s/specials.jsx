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
import specialsJson from "../../data/specials.json";

export default function Specials() {
  const SEO = {
    title: "Classics TV | 90s Specials TV Channels",
    description: "",

    openGraph: {
      title: "Classics TV | 90s Specials TV Channels",
      description: "",
    },
  };

  const router = useRouter();

  const jsonLength = specialsJson.specials.length;

  const [videoIndex, setVideoIndex] = useState(0);
  const [specials, setCatoons] = useState(specialsJson.specials);
  const [title, setTitle] = useState("");

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = specials[videoIndex + 1].videoId;
    const nextVideoTitle = specials[videoIndex + 1].title;

    router.push(
      `/90s/specials/${nextVideoId}?${encodeURIComponent(nextVideoTitle).replace(
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
            channelInfo="Specials TV channels from the 90s were a platform for some of the most groundbreaking and influential programs of the decade. From awards shows like the Oscars and the Grammys to special events like Live Aid and the Olympics, they brought us live coverage of some of the most significant moments in pop culture and world history. These channels provided us with a chance to witness history in the making, from the fall of the Berlin Wall to the inauguration of new presidents. They also brought us exclusive interviews and behind-the-scenes looks at the worlds of politics, entertainment, and sports. Whether you were a fan of music, sports, or current events, there was always something to watch on specials TV channels in the 90s. Even today, these programs continue to be a part of our cultural conversation, and they remain an important part of the television landscape."
          />
        </div>
      </div>
      <CardsInfo />
    </main>
  );
}
