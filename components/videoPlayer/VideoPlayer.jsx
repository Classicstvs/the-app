import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

import { useRouter } from "next/router";

import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({
  videoId,
  muted,
  onTitleChange,
  volume,
  player,
  onEnded,
}) => {
  const router = useRouter();

  const [video, setVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState();
  const [videoPlayer, setPlayer] = useState();
  const [reactPlayer, setReactPlayer] = useState();
  const playerRef = useRef(null);

  const apiKey = process.env.API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
      )
      .then((response) => {
        const title = response.data.items[0].snippet.title;
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        setVideoTitle(title);
        setVideo(url);
        onTitleChange(title);
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [videoId]
      );
  });

  useEffect(() => {
    const player = playerRef.current;
    if (player) {
      const handlePlayerReady = () => {
        player.getInternalPlayer().playVideo();
      };
      player.on("ready", handlePlayerReady);
      return () => {
        player.off("ready", handlePlayerReady);
      };
    }
  }, []);

  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setPlayer("videoPlayer");
    }
    if (router.pathname.startsWith("/80s")) {
      setPlayer("videoPlayer80s");
    }
  },[]);

  useEffect(() => {
    if (router.pathname.startsWith("/") || router.pathname.startsWith("/90s")) {
      setReactPlayer("reactPlayer");
    }
    if (router.pathname.startsWith("/80s")) {
      setReactPlayer("reactPlayer80s");
    }
  },[router.pathname]);

  return (
    <div className={styles[videoPlayer]}>
      {video ? (
        <ReactPlayer
          className={styles[reactPlayer]}
          ref={player}
          onEnded={onEnded}
          width="615px"
          height="460px"
          url={video}
          playing={true}
          controls={false}
          loop={false}
          volume={volume}
          // muted={muted}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
                disablekb: 1,
                showinfo: 0,
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
