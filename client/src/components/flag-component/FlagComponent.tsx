import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import Chinese from '../../assets/images-components/flags/Chinese.svg';
import English from '../../assets/images-components/flags/English.svg';
import French from '../../assets/images-components/flags/French.svg';
import German from '../../assets/images-components/flags/German.svg';
import Italian from '../../assets/images-components/flags/Italian.svg';
import Japanese from '../../assets/images-components/flags/Japanese.svg';
import Korean from '../../assets/images-components/flags/Korean.svg';
import Russian from '../../assets/images-components/flags/Russian.svg';
import Spanish from '../../assets/images-components/flags/Spanish.svg';

const FlagComponent = (props: { language: string }) => {
  let country: string;

  switch (props.language) {
    case 'Chinese':
      country = Chinese;
      break;
    case 'English':
      country = English;
      break;
    case 'French':
      country = French;
      break;
    case 'German':
      country = German;
      break;
    case 'Italian':
      country = Italian;
      break;
    case 'Japanese':
      country = Japanese;
      break;
    case 'Korean':
      country = Korean;
      break;
    case 'Russian':
      country = Russian;
      break;
    case 'Spanish':
      country = Spanish;
  }

  return (
    <div className='flag-component'>
      <img src={country} />
    </div>
  );
};

// let code: string;
//   switch (props.language) {
//     case 'Chinese':
//       code = 'CN';
//       break;
//     case 'English':
//       code = 'GB';
//       break;
//     case 'French':
//       code = 'FR';
//       break;
//     case 'Italian':
//       code = 'IT';
//       break;
//     case 'Spanish':
//       code = 'ES';
//       break;
//   }

//   return (
//     <div>
//       <ReactCountryFlag
//         className="emojiFlag"
//         countryCode={code}
//         style={{
//           fontSize: '4em',
//           // lineHeight: '4em',
//         }}
//         aria-label={props.language}
//       />
//     </div>
//   );
// };

export default FlagComponent;
