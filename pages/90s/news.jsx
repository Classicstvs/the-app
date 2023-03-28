import { useState } from "react";
import { useRouter } from "next/router";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";


import newsJson from "../../data/cartoons.json";

export default function Home() {
  const router = useRouter();

  const [videoIndex, setVideoIndex] = useState(0);
  const [news, setVideoData] = useState(newsJson.cartoons);

  const playNext = () => {
    setVideoIndex((prevIndex) => prevIndex + 1);

    const nextVideoId = news[videoIndex + 1].videoId;
    const nextVideoTitle = news[videoIndex + 1].title;

    router.push(`/90s/news/${nextVideoId}`);
  };

  const playPrev = () => {
    setVideoIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      <div className="wrapper">
        <div className="player">
          <VideoPlayer
            videoId={news[videoIndex].videoId}
            onEnd={playNext}
          />
          <button onClick={playPrev} disabled={videoIndex === 0}>
            Prev
          </button>
          <button onClick={playNext}>Next Video</button>
        </div>
      </div>
    </>
  );
}
