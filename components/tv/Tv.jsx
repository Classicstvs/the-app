import Image from 'next/image'

import styles from './Tv.module.css'

export default function Tv() {
  return (
    <div className={styles.tvContainer}>
      <Image src='/images/tv90.webp' alt='Tv90' width={700} height={664} className={styles.tv}/>
      <div className={`${styles.blackScreen} ${styles.crtScanlines}`}></div>
      <Image src='/images/blob.svg' alt='Blob-Tv-Background' width={800} height={764} className={styles.blob} priority="low"/>
    </div>
  )
}
