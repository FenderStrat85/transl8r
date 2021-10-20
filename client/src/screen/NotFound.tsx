import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const NotFound = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie
      .loadAnimation({
        //@ts-expect-error
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../assets/animations/404.json'),
      })
      .setSpeed(0.35);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="not-found-screen">
      <h1>404 - Not Found</h1>
      <div
        className="login-screen__animation-container"
        ref={animationContainer}
      ></div>
    </div>
  );
};

export default NotFound;
