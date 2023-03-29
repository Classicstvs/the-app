import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/videoPlayer/VideoPlayer';

import NewsDb from "../../../data/cartoons.json";

export default function Video() {
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  useEffect(() => {
    if (videoTitle) {
      document.title = videoTitle;
    }
  }, [videoTitle]);


  const [videoIndex, setVideoIndex] = useState(0);
  const [newsDb, setVideoData] = useState(NewsDb.cartoons);

  const playNext = () => {
    if (newsDb && newsDb.length > videoIndex + 1) {
      setVideoIndex((prevIndex) => prevIndex + 1);
  
      const nextVideoId = newsDb[videoIndex + 1].videoId;
      const nextVideoTitle = newsDb[videoIndex + 1].title;
  
      router.push(`/90s/news/${nextVideoId}?videoTitle=${encodeURIComponent(nextVideoTitle).replace(/%20/g, "")}`);
    }
  };
  
  const playPrev = () => {
    if (newsDb && videoIndex > 0) {
      setVideoIndex((prevIndex) => prevIndex - 1);
  
      const prevVideoId = newsDb[videoIndex - 1].videoId;
      const prevVideoTitle = newsDb[videoIndex - 1].title;
  
      router.push(`/news/${prevVideoId}?videoTitle=${encodeURIComponent(prevVideoTitle).replace(/%20/g, "")}`);
    }
  };
  
  

  return (
    <>

      <VideoPlayer videoId={videoId} videoTitle={videoTitle}/>
      <h1>{videoTitle}</h1>
      {/* <p>{newsDb[videoIndex].snippet.description}</p> */}
      <button onClick={playPrev} disabled={videoIndex === 0}>
            Prev
          </button>
          <button onClick={playNext}>Next Video</button>
    </>
  );
}
