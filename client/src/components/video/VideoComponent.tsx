import VideoStream from "./VideoStream";
import VideoOptions from "./VideoOptions";
import VideoNotifications from "./VideoNotifications";
import { SocketProvider } from "../../context/SocketContext";

const VideoComponent = () => {
  return (
    <>
      {/* <SocketProvider> */}
      <VideoStream />
      <VideoOptions>
        <VideoNotifications />
      </VideoOptions>
      {/* </SocketProvider> */}
    </>
  );
}

export default VideoComponent;