import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { IImage } from '../../interfaces/interfaces';
import { useContext } from 'react';
import BackButton from '../button/BackButton';

const CompletedImage = (): JSX.Element => {
  const job: any = useLocation().state;
  const accessToken = localStorage.getItem('accessToken');
  const { user } = useContext(UserContext);
  const [image, setImage] = useState<IImage>({
    _id: '',
    imageUrl: '',
    translatedText: '',
    imageUrlTranslated: '',
    JobId: '',
  });

  const fetchImageData = async (): Promise<void> => {
    const imageCompleted = await apiService.fetchImageData(
      job._id,
      accessToken,
    );
    setImage(imageCompleted);
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <div className="completed-image__container">
      {user.role === 'customer' ? (
        <div className="completed-image__container--customer">
          <h2> Image Job : </h2>
          {image.imageUrl ? (
            <div className="completed-image__container--image-customer">
              <p>You have requested a translation for this image: </p>
              <img
                className="completed-image__image--customer"
                src={image.imageUrl}
                alt="user"
                style={{ width: '50%' }}
              />
              <p>
                and you have recieved this translation and this helper text:
              </p>
              {image.translatedText}
              <img
                className="completed-image__image--customer"
                src={image.imageUrlTranslated}
                alt="translator"
                style={{ width: '50%' }}
              />
              <p>Hoping you liked it don't forget to rate the translator !</p>
            </div>
          ) : (
            <h2>Fetching your image</h2>
          )}
        </div>
      ) : (
        <div className="completed-image__container--translator">
          <h2> Image Job : </h2>
          {image.imageUrl ? (
            <div className="completed-image__container--image-translator">
              <p>You completed a translation for this image: </p>
              <img
                className="completed-image__image--translator"
                src={image.imageUrl}
                alt="user"
                style={{ width: '50%' }}
              />
              <p>and you added this helper text: </p>
              {image.translatedText}
              <img
                className="completed-image__image--translator"
                src={image.imageUrlTranslated}
                alt="translator"
                style={{ width: '50%' }}
              />
              <p>Thanks for helping someone translate!</p>
            </div>
          ) : (
            <h2>Fetching your image</h2>
          )}
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default CompletedImage;
