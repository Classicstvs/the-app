import Image from "next/image";
import Link from "next/link"

import styles from "./ChannelBtn.module.css";

export default function ChannelBtn({ channel }) {
  return (
  <Link href=''>
      <button className={styles.channelBtn}>
      <p>{channel.name}</p>

      {channel.image  ?  <Image
        src={channel.image}
        alt={channel.name}
        width={channel.width}
        height={channel.height}
      /> : ''}
    
    </button>
  </Link>
  );
}
