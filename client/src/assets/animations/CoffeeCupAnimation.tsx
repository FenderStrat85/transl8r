import Lottie from 'react-lottie-player';
import coffeeCupJson from './CoffeeCup.json';

function CoffeeCupAnimation() {
  return (
    <div className='coffee-cup-animation__container'>
      <Lottie
        loop
        animationData={coffeeCupJson}
        play
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default CoffeeCupAnimation;
