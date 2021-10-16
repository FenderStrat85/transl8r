import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const FlagComponent = (props: { language: string }) => {
  let code: string;

  switch (props.language) {
    case 'Chinese':
      code = 'CN';
      break;
    case 'English':
      code = 'GB';
      break;
    case 'French':
      code = 'FR';
      break;
    case 'Italian':
      code = 'IT';
      break;
    case 'Spanish':
      code = 'ES';
      break;
  }

  return (
    <div>
      <ReactCountryFlag
        className="emojiFlag"
        countryCode={code}
        style={{
          fontSize: '4em',
          // lineHeight: '4em',
        }}
        aria-label={props.language}
      />
      {/* 
      <ReactCountryFlag
        countryCode="US"
        svg
        style={{
          width: '4em',
          height: '4em',
        }}
        title="US"
      /> */}
    </div>
  );
};

export default FlagComponent;
