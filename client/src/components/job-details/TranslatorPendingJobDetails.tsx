import { UserContext } from '../../context/Context';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import BackButton from '../button/BackButton';

export const TranslatorPendingJobDetails = (): JSX.Element => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const [image, setImage] = useState('');
  const job: any = useLocation();
  const { _id, jobType, jobDescription } = job.state;

  const fetchImage = async (): Promise<void> => {
    const { imageUrl } = await apiService.fetchImage(_id, accessToken);
    console.log(imageUrl);
    setImage(imageUrl);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  let jobAccepted = false;

  const acceptJob = async (): Promise<void> => {
    const res = await apiService.acceptJob(job.state, accessToken);
    console.log('res from translatorJobDetail', res);
    if (res.status === 'accepted') {
      jobAccepted = true;
      if (res.jobType === 'chat') {
        history.push(`/app/translator/${res.jobType}:${res._id}`, {
          state: res,
        });
      }
      if (res.jobType === 'image') {
        history.push({
          pathname: `/app/translator/${res.jobType}:${res._id}`,
          state: { ...job.state, image },
        });
      }
      if (res.jobType === 'video') {
        history.push({
          pathname: `/app/translator/${res.jobType}:${res._id}`,
          state: { ...job.state },
        });
      }
    }
  };

  return (
    <>
      <div>
        {!jobAccepted ? (
          <div>
            <h1>Job detail</h1>
            <h2>{user.firstName}</h2>
            <h2>{jobType}</h2>
            <h3>{jobDescription}</h3>
            {image ? (
              <img src={image} alt="user's image" style={{ width: 300 }} />
            ) : null}

            <button onClick={() => acceptJob()}>Accept this job</button>
            <BackButton />
          </div>
        ) : (
          <h1>Awesome, you've accepted!</h1>
        )}
      </div>
    </>
  );
};

export default TranslatorPendingJobDetails;
