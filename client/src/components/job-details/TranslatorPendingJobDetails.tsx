import { UserContext } from '../../context/Context';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import BackButton from '../button/BackButton';

export const TranslatorPendingJobDetails = (props: any) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const [image, setImage] = useState('');
  const job = useLocation();
  const {
    _id,
    jobName,
    jobType,
    languageFromName,
    languageToName,
    jobDescription,
  } = job.state;

  const fetchImage = async () => {
    const { imageUrl } = await apiService.fetchImage(_id, accessToken);
    console.log(imageUrl);
    setImage(imageUrl);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  let jobAccepted = false;

  const acceptJob = async () => {
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
    <div className='translator-pending-job-details__container'>
      {!jobAccepted ? (
        <>
          <h1>Job detail</h1>
          <h2>{user.firstName}</h2>
          <h2>{jobType}</h2>
          <h3>{jobDescription}</h3>
          {image ? (
            <img className='translator-pending-job-details__image' src={image} alt="user's image" style={{ width: 300 }} />
          ) : null}

          <button className='translator-pending-job-details__button' onClick={() => acceptJob()}>Accept this job</button>
          <BackButton />
        </>
      ) : (
        <h1>Awesome, you've accepted!</h1>
      )}
    </div>
  );
};

export default TranslatorPendingJobDetails;
