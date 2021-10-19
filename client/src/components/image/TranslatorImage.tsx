import { useContext, useState } from 'react';
import * as markerjs2 from 'markerjs2';
import ApiService from '../../services/apiService';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/Context';
//import { IImageJob } from '../../interfaces/interfaces';

// job: IImageJob -> in approuting it is passed as job.state so we've used any
const TranslatorImage = (props: { job: any }): JSX.Element => {
  const history = useHistory<History>();

  const { user } = useContext(UserContext);
  const accessToken: string | null = localStorage.getItem('accessToken');
  const { jobName, image, _id } = props.job;
  const COMPLETED = 'completed';
  const cloudinaryApiKey: any = process.env.REACT_APP_CLOUDINARY_API_KEY;

  const [value, setValue] = useState('');

  const showMarkerArea = (): void => {
    //TODO: It's probably better to avoid native DOM API methods and use the Refs which is React's way of accessing DOM elements.
    const markerArea = new markerjs2.MarkerArea(
      document.getElementById('translator') as HTMLInputElement,
    );

    markerArea.addRenderEventListener((dataUrl): void => {
      (document.getElementById('translator') as HTMLInputElement).src = dataUrl;
    });

    // finally, call the show() method and marker.js UI opens
    markerArea.show();
  };

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<void> => {
    event.preventDefault();
    const imgToUpload = (
      document.getElementById('translator') as HTMLInputElement
    ).src;

    const textToUpload = value;

    if (!(imgToUpload === image)) {
      const data = new FormData();
      data.append('file', imgToUpload);
      data.append('upload_preset', 'transl8r');

      // call to the api cloudinary need to be setup
      try {
        const res = await fetch(cloudinaryApiKey, {
          method: 'POST',
          body: data,
        });
        const { secure_url } = await res.json();

        uploadImageToDB(secure_url);
      } catch (error) {
        console.log(error);
      }
    }
    uploadTextToDb(textToUpload);
  };

  const uploadImageToDB = async (url: string): Promise<void> => {
    try {
      await ApiService.uploadTranslatedImage({ url }, accessToken, _id);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTextToDb = async (text: string): Promise<void> => {
    try {
      await ApiService.uploadTranslatedTextOfImage({ text }, accessToken, _id);
      await ApiService.changeStatus(_id, COMPLETED, accessToken);
      user.role === 'translator'
        ? history.push(`/app/translator/dashboard`)
        : history.push(`/app/customer/selectjob`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }): void => {
    setValue(event.target.value);
  };

  return (
    <div className="translator-image">
      <div className="translator-image__header">
        <h2>{jobName}</h2>
      </div>
      <form className="translator-image__form" onSubmit={handleSubmit}>
        <img
          className="translator-image__image"
          crossOrigin="anonymous"
          id="translator"
          src={image}
          alt="sample"
          style={{ maxWidth: '50%' }}
          onClick={() => showMarkerArea()}
        />
        <textarea
          className="translator-image__text-area"
          required
          name="textarea"
          value={value}
          onChange={(event) => handleChange(event)}
        />
        <button className="translator-image__button" type="submit">
          Send Translation
        </button>
      </form>
    </div>
  );
};

export default TranslatorImage;
