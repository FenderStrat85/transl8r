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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="completed-image">
        {user.role === 'customer' ? (
          <div className="completed-image__container">
            <h1>Your image translation:</h1>
            {image.imageUrl ? (
              <div className="completed-image__container--image">
                <h3>Your translated image:</h3>
                <img
                  className="completed-image__image"
                  src={image.imageUrlTranslated}
                  alt="translator"
                />
                <div className="translated-text">"{image.translatedText}"</div>
                <h3>The original image: </h3>
                <img
                  className="completed-image__image"
                  src={image.imageUrl}
                  alt="user"
                />
              </div>
            ) : (
              <h2>Fetching your image</h2>
            )}
          </div>
        ) : (
          <div className="completed-image">
            {image.imageUrl ? (
              <div className="completed-image__container">
                <h1>Your translation:</h1>
                <div className="completed-image__container--image">
                  <h3>Your completed translation for this image: </h3>
                  <img
                    className="completed-image__image"
                    src={image.imageUrlTranslated}
                    alt="translator"
                  />
                  <h3>You added this helper text: </h3>
                  <div className="translated-text">
                    "{image.translatedText}"
                  </div>
                  <h3>The original image:</h3>
                  <img
                    className="completed-image__image"
                    src={image.imageUrl}
                    alt="user"
                  />
                  <p>Thanks for helping someone translate!</p>
                </div>
              </div>
            ) : (
              <h2>Fetching your image</h2>
            )}
          </div>
        )}
        <BackButton />
      </div>
    </>
  );
};

export default CompletedImage;
