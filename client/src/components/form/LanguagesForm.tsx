import { useState } from 'react';
import Select from 'react-select';
import languageChoice from '../../constants/languageChoice';
import { Language } from '../../interfaces/interfaces';

const LanguagesForm = (): JSX.Element => {
  const options = languageChoice;
  const [selectedFrom, setSelectedFrom] = useState<Language>();
  const [selectedTo, setSelectedTo] = useState<Language>();

  const handleSelectedFrom = (event: any) => {
    setSelectedFrom(event);
  };

  const handleSelectedTo = (event: any) => {
    setSelectedTo(event);
  };

  return (
    <>
      <h3>What language do you need translating from?</h3>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <Select
        options={options}
        value={selectedFrom}
        onChange={(event) => handleSelectedFrom(event)}
        // labelledBy="Select"
      />
      <h3>What languages do you need translating to?</h3>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <Select
        options={options}
        value={selectedTo}
        onChange={(event) => handleSelectedTo(event)}
        // labelledBy="Select"
      />
    </>
  );
};

export default LanguagesForm;
