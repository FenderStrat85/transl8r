import React, { useState } from 'react';
import './App.css';
import * as markerjs2 from 'markerjs2';

const TranslatorImage = (props: { job: any }) => {
  const { jobName, imageUrl, translationText } = props.job;

  const [value, setValue] = useState('');

  // needed if we want a confirmation img
  // const [resultsImage, setResultsImage] = useState('');

  const showMarkerArea = () => {
    let markerArea = new markerjs2.MarkerArea(
      document.getElementById('translator'),
    );

    markerArea.addRenderEventListener((dataUrl) => {
      (document.getElementById('translator') as HTMLInputElement).src = dataUrl;
    });

    // finally, call the show() method and marker.js UI opens
    markerArea.show();
  };

  const handleSubmit = async () => {
    const imgToUpload = (
      document.getElementById('translator') as HTMLInputElement
    ).src;

    const textToUpload = value;

    if (!(imgToUpload === imageUrl)) {
      const data = new FormData();
      data.append('file', imgToUpload);
      data.append('upload_preset', 'transl8r');

      // call to the api cloudinary need to be setup
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/uro00/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );
      const { secure_url } = await res.json();

      uploadToDB(secure_url, textToUpload);
    } else {
      uploadToDB('-', textToUpload);
    }
  };

  const uploadToDB = (url: string, text: string) => {
    //db magic + check "-"
    console.log(`${url} and  ${text} in on db`);
    //rendering results if needed
    //setResultsImage(secure_url);
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  return (
    <>
      <h2>{jobName}</h2>
      <form onSubmit={handleSubmit}>
        <img
          crossOrigin="anonymous"
          id="translator"
          src={imageUrl}
          alt="sample"
          style={{ maxWidth: '100%' }}
          onClick={() => showMarkerArea()}
        />

        <textarea
          required
          name="textarea"
          value={value}
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">Send Translation</button>
      </form>

      {/*
        <img src={resultsImage} alt="results" />
        */}
    </>
  );
};
