import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoPlayer from '../../../components/videoPlayer/VideoPlayer';

import cartoonsJson from "../../data/cartoons.json";

export default function Video() {
  const router = useRouter();
  const { videoId, videoTitle } = router.query;

  useEffect(() => {
    if (videoTitle) {
      document.title = videoTitle;
    }
  }, [videoTitle]);


  const [videoIndex, setVideoIndex] = useState(0);
  const [cartoons, setCatoons] = useState(cartoonsJson.cartoons);

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = cartoons[videoIndex + 1].id.videoId;
    const nextVideoTitle = cartoons[videoIndex + 1].snippet.title;

    router.push(`/90s/cartoons/${nextVideoId}?videoTitle=${encodeURIComponent(nextVideoTitle).replace(/%20/g, "")}`);
  };

  const playPrev = () => {
    setVideoIndex((prevIndex) => prevIndex - 1);
  
    const prevVideoId = cartoons[videoIndex - 1].id.videoId;
    const prevVideoTitle = cartoons[videoIndex - 1].snippet.title;
  
    router.push(`/90s/cartoons/${prevVideoId}?videoTitle=${encodeURIComponent(prevVideoTitle).replace(/%20/g, "")}`);
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
