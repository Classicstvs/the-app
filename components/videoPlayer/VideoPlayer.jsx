import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ videoId, muted, onTitleChange }) => {
  const [video, setVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState();

  const apiKey = process.env.API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyDb9qFHPemuFLMJuBrmxjg5awl5DWVoAHk&part=snippet`
      )
      .then((response) => {
        const title = response.data.items[0].snippet.title;
        const url = `https://www.youtube.com/watch?v=${videoId}`;
        setVideoTitle(title);
        setVideo(url);
        onTitleChange(title)
      })
      .catch(
        (error) => {
          console.log(error);
        },
        [videoId]
      );
  });

  return (
    <div className={styles.videoPlayer}>
      {video ? (
        <ReactPlayer
          width="615px"
          height="460px"
          url={video}
          playing={true}
          controls={false}
          loop={true}
          muted={muted}
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
