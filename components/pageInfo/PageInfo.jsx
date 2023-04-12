import { useRouter } from "next/router";

import styles from "./PageInfo.module.css";
import { useEffect, useState } from "react";


export default function PageInfo({years, info}) {

const router = useRouter()

const [yearColor, setYearColor] = useState()

useEffect(()=>{
  if(router.pathname.startsWith('/') || router.pathname.startsWith('/90s')){
    setYearColor("color90s")
  }
  if(router.pathname.startsWith('/80s')){
    setYearColor("color80s")
  }
}, [router.pathname])

  return (
    <div className={styles.pageInfoWrapper}>
      <h1>
        <span className={styles[yearColor]}>{years}</span> TV Classics
      </h1>
      <p>
       {info}
      </p>
    </div>
  );
}
