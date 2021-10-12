import React from "react";
import VideoPlayer from "./components/videoPlayer";
import Options from "./components/options";
import Notifications from "./components/notifications";

const VideoComponent = () => {
  return (
    <>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </>
  );
}

export default VideoComponent;