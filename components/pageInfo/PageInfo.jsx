import { useRouter } from "next/router";

import styles from "./PageInfo.module.css";


export default function PageInfo() {

const router = useRouter()

const pageInfoWrapperClass = router.pathname === '/'
? styles.pageInfoWrapper 
: styles.pageInfoWrapperRes

  return (
    <div className={pageInfoWrapperClass}>
      <h1>
        <span>90s</span> TV Classics
      </h1>
      <p>
        The TV channels from the 90s evoke a sense of nostalgia. It was a time
        when cable TV was still new, and people had access to a limited number
        of channels. Despite this, there was something special about the
        programming. From classic sitcoms to Saturday morning cartoons, viewers
        tuned in for hours on end. The TVs themselves were bulky and lacked the
        sleek designs of modern-day sets, but they had a certain charm that&#39;s
        hard to replicate today. The 90s were a simpler time for television, but
        one that&#39;s fondly remembered by many.
      </p>
    </div>
  );
}
