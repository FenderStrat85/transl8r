import { useLocation, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/Context';
import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { IImage } from '../../interfaces/interfaces';
import { Rating, RatingView } from 'react-simple-star-rating';

const CompletedImage = () => {
  const job = useLocation().state;
  const accessToken = localStorage.getItem('accessToken');
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
    //call to database to update the rating for the job
    //conditionally render the Rating or RatingView if job.rating
    //can then use this to update translators rating if still want to use it
  };

  const [image, setImage] = useState<IImage>({
    _id: '',
    imageUrl: '',
    translatedText: '',
    imageUrlTranslated: '',
    JobId: '',
  });

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
          <Rating onClick={handleRating} ratingValue={rating} />
          <RatingView ratingValue={2} />
        </div>
      ) : (
        <h2>Fetching your image</h2>
      )}
    </div>
  );
};

export default CompletedImage;
