import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import BackButton from '../button/BackButton';
import { ICustomer } from '../../interfaces/interfaces';

export const TranslatorPendingJobDetails = (): JSX.Element => {
  const history: any = useHistory();
  const accessToken = localStorage.getItem('accessToken');
  const [image, setImage] = useState('');
  const [customerName, setCustomerName] = useState('');
  const job: any = useLocation();
  const { _id, jobType, jobDescription } = job.state;

  const fetchImage = async (): Promise<void> => {
    if (jobType !== 'image') return;
    const { imageUrl } = await apiService.fetchImage(_id, accessToken);
    setImage(imageUrl);
  };

  const fetchCustomerName = async (): Promise<void> => {
    const customerObject: ICustomer = await apiService.getCustomerName(
      _id,
      accessToken,
    );
    const name = customerObject.firstName;
    setCustomerName(name);
  };
  useEffect(() => {
    fetchImage();
    fetchCustomerName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let jobAccepted: boolean = false;

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
    <div className="translator-pending-job-details">
      {!jobAccepted ? (
        <>
          <h1 className="translator-pending-job-details__header">
            Job details
          </h1>
          {jobType === 'chat' ? (
            <h2>
              {customerName.toLocaleUpperCase()} has requested some help via
              chat with you:
            </h2>
          ) : null}
          {jobType === 'video' ? (
            <h2>
              {customerName.toLocaleUpperCase()} would like to receive some help
              via video chat:
            </h2>
          ) : null}
          {jobType === 'image' ? (
            <h2>
              {customerName.toLocaleUpperCase()} needs help with some words in
              this image:
            </h2>
          ) : null}
          <p>"{jobDescription}"</p>
          {image ? (
            <img
              className="translator-pending-job-details__image"
              src={image}
              alt="customer's translation request"
            />
          ) : null}

          <button
            className="translator-pending-job-details__button"
            onClick={() => acceptJob()}
          >
            Accept this job
          </button>
          <BackButton />
        </>
      ) : (
        <h1>Awesome, you've accepted!</h1>
      )}
    </div>
  );
};

export default TranslatorPendingJobDetails;
