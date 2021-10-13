import VideoStream from "./VideoStream";
import VideoOptions from "./VideoOptions";
import VideoNotifications from "./VideoNotifications";

const VideoComponent = () => {
  return (
    <>
      <VideoStream />
      <VideoOptions>
        <VideoNotifications />
      </VideoOptions>
    </>
  );
}

export default VideoComponent;