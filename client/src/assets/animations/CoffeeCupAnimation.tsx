import Lottie from 'react-lottie-player';
import coffeeCupJson from './CoffeeCup.json';

function CoffeeCupAnimation() {
  return (
    <>
      <Lottie
        loop
        animationData={coffeeCupJson}
        play
        style={{ height: '300px', width: '300px' }}
      />
    </>
  );
}

export default CoffeeCupAnimation;
