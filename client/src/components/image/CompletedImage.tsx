import { useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { IImage } from '../../interfaces/interfaces';
// (props: {
//   job: { imageUrl: string; imageUrlTranslated: string; translatedText: string };
// })

const CompletedImage = () => {
  const job = useLocation().state;
  const accessToken = localStorage.getItem('accessToken');
  const [image, setImage] = useState<IImage>({
    _id: '',
    imageUrl: '',
    translatedText: '',
    imageUrlTranslated: '',
    JobId: '',
  });

  // console.log('job', job);

  const fetchImageData = async () => {
    const imageCompleted = await apiService.fetchImageData(
      job._id,
      accessToken,
    );
    console.log('imageCompleted', imageCompleted);
    setImage(imageCompleted);
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  console.log('image', image);
  // const { imageUrl, imageUrlTranslated, translatedText } = image;
  //const imageUrl = image?.imageUrl;

  // const { imageUrl, imageUrlTranslated, translatedText } = job;

  return (
    <div>
      <h2> Image Job : </h2>
      {image.imageUrl ? (
        <div>
          <div>
            <p>You have requested a translation for this image: </p>
            <img src={image.imageUrl} alt="user" style={{ width: '50%' }} />
          </div>
          <div>
            <p>and you have recieved this translation and this helper text: </p>
            <img
              src={image.imageUrlTranslated}
              alt="translator"
              style={{ width: '50%' }}
            />
            {image.translatedText}
          </div>
          <div>Hoping you liked it don't forget to rate the translator !</div>
        </div>
      ) : (
        <h2>Fetching your image</h2>
      )}
    </div>
  );
};

export default CompletedImage;
