import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import styles from "./ChannelBtn.module.css";
import { useEffect, useState } from "react";

export default function ChannelBtn({ channel }) {
  const router = useRouter();

  const isActive = router.pathname.startsWith(channel.url);

  const [channelBtnColor, setChannelBtnColor] = useState();

  const [activeBtn, setActiveBtn] = useState();

  const btn80s = (
    <button
      className={`${styles["channelBtn80s"]} 
  ${isActive && styles["active80s"]}`}
    >
      <p>{channel.name}</p>

      {channel.image && (
        <Image
          src={channel.image}
          alt={channel.name}
          width={channel.width}
          height={channel.height}
        />
      )}
    </button>
  );

  const btn90s = (
    <button
      className={`${styles["channelBtn"]} 
  ${isActive && styles["active"]}`}
    >
      <p>{channel.name}</p>

      {channel.image && (
        <Image
          src={channel.image}
          alt={channel.name}
          width={channel.width}
          height={channel.height}
        />
      )}
    </button>
  );



  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setChannelBtnColor("channelBtn");
    }
    if (router.pathname.startsWith("/80s")) {
      setChannelBtnColor("channelBtn80s");
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setActiveBtn(btn90s);
    }
    if (router.pathname.startsWith("/80s")) {
      setActiveBtn(btn80s);
    }
  }, [router.pathname]);





  return (
    <Link href={channel.url} scroll={false}>
      {activeBtn}
    </Link>
  );
}
