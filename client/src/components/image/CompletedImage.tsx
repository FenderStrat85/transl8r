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
    console.log('imageCompleted', imageCompleted);
    setImage(imageCompleted);
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  console.log('image', image);

  return (
    <>
      {user.role === 'customer' ? (
        <div>
          <h2> Image Job : </h2>
          {image.imageUrl ? (
            <div>
              <div>
                <p>You have requested a translation for this image: </p>
                <img src={image.imageUrl} alt="user" style={{ width: '50%' }} />
              </div>
              <div>
                <p>
                  and you have recieved this translation and this helper text:{' '}
                </p>
                <img
                  src={image.imageUrlTranslated}
                  alt="translator"
                  style={{ width: '50%' }}
                />
                {image.translatedText}
              </div>
              <div>
                Hoping you liked it don't forget to rate the translator !
              </div>
            </div>
          ) : (
            <h2>Fetching your image</h2>
          )}
        </div>
      ) : (
        <div>
          <h2> Image Job : </h2>
          {image.imageUrl ? (
            <div>
              <div>
                <p>You completed a translation for this image: </p>
                <img src={image.imageUrl} alt="user" style={{ width: '50%' }} />
              </div>
              <div>
                <p>and you added this helper text: </p>
                <img
                  src={image.imageUrlTranslated}
                  alt="translator"
                  style={{ width: '50%' }}
                />
                {image.translatedText}
              </div>
              <div>Thanks for helping someone translate!</div>
            </div>
          ) : (
            <h2>Fetching your image</h2>
          )}
        </div>
      )}
      <BackButton />
    </>
  );
};

export default CompletedImage;
