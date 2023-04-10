import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import styles from "./ChannelBtn.module.css";

export default function ChannelBtn({ channel }) {
  const router = useRouter();

  const isActive = router.pathname.startsWith(channel.url);

  return (
    <Link href={channel.url} scroll={false}>
      <button
        className={`${styles.channelBtn} ${isActive ? styles.active : ""}`}
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
    </Link>
  );
}
