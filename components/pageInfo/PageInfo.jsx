import { useRouter } from "next/router";

import styles from "./PageInfo.module.css";
import { useEffect, useState } from "react";


export default function PageInfo({years, info}) {

const router = useRouter()

const pageInfoWrapperClass = router.pathname === '/'
? styles.pageInfoWrapper 
: styles.pageInfoWrapperRes

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
    <div className={pageInfoWrapperClass}>
      <h1>
        <span className={styles[yearColor]}>{years}</span> TV Classics
      </h1>
      <p>
       {info}
      </p>
    </div>
  );
}
