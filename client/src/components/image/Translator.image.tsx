import React /*,{ useState }*/ from 'react';
import './App.css';
import * as markerjs2 from 'markerjs2';

const TranslatorImage = (props: { job: any }) => {
  const { jobName, imageUrl } = props.job;
  // needed if we want a confirmation img
  // const [resultsImage, setResultsImage] = useState('');

  const showMarkerArea = () => {
    //TODO: It's probably better to avoid native DOM API methods and use the Refs which is React's way of accessing DOM elements.
    const markerArea = new markerjs2.MarkerArea(
      document.getElementById('translator'),
    );

    markerArea.addRenderEventListener((dataUrl) => {
      (document.getElementById('translator') as HTMLInputElement).src = dataUrl;
    });

    // finally, call the show() method and marker.js UI opens
    markerArea.show();
  };

  const uploadEditedImage = async () => {
    const imgToUpload = (
      document.getElementById('translator') as HTMLInputElement
    ).src;
    const data = new FormData();
    data.append('file', imgToUpload);
    data.append('upload_preset', 'transl8rEdited');

    // call to the api cloudinary need to be setup
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/uro00/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const { secure_url } = await res.json();

    uploadToDB(secure_url);
  };

  const uploadToDB = (secure_url: string) => {
    //db magic
    console.log(`${secure_url} in on db`);
    //rendering results if needed
    //setResultsImage(secure_url);
  };

  return (
    <>
      <h2>{jobName}</h2>
      <div>
        <img
          crossOrigin="anonymous"
          id="translator"
          src={imageUrl}
          alt="sample"
          style={{ maxWidth: '100%' }}
          onClick={() => showMarkerArea()}
        />
        <button onClick={() => uploadEditedImage()}>Send img</button>
      </div>

      {/*
        <img src={resultsImage} alt="results" />
        */}
    </>
  );
};
