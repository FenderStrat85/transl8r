import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../../../services/apiService';
import { useHistory } from 'react-router-dom';

import bidirectional from './../../../assets/icons/bidirectional.svg';
import video from './../../../assets/icons/video.svg';
import chat from './../../../assets/icons/chat.svg';
import image from './../../../assets/icons/image.svg';
import arrow from './../../../assets/icons/arrow.svg';
import del from './../../../assets/icons/del.svg';
import { ProgressBar } from 'react-toastify/dist/components';

const PendingAndAcceptedCustomerJobTile = (props: {
  job: any;
  deleteJob?: any;
}): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory<History>();

  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    _id,
    notification,
  } = props.job;

  let notificationMessage: string = '';

  switch (jobType) {
    case 'image':
      notificationMessage =
        'A translator has accepted your job! Please keep an eye on your completed jobs page for your image translation';
      break;
    case 'chat':
      notificationMessage =
        'A translator has accepted your job! Click here to join them in the live chat!';
      break;
    case 'video':
      notificationMessage =
        'A translator has accepted your job! Click here to join them in a live video!';
      break;
  }

  if (notification && jobType !== 'image') {
    toast(notificationMessage, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClose: () => {
        history.push({
          pathname: `/app/customer/acceptedjob/${jobType}:${_id}`,
          state: props.job,
        });
      },
    });
    apiService.setNotificationToFalse(props.job, accessToken);
    props.job.notification = false;
  }

  if (notification && jobType === 'image') {
    toast(notificationMessage, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    apiService.setNotificationToFalse(props.job, accessToken);
    props.job.notification = false;
  }

  return (
    <>
      {status === 'pending' ? (
        <div className="pending-customer">
          <p>
            {/* {' '} */}
            {/* {jobName} : Status:{status} is a {jobType} */}
            {/* <button onClick={() => props.deleteJob(props.job._id, accessToken)}>
              I am the delete button
            </button> */}
          </p>
          <div className="pending-customer__flag-container">
            <FlagComponent language={languageFromName} />
            <img
              className="pending-customer__bidirectional"
              src={bidirectional}
              alt="bidirectional"
            />
            <FlagComponent language={languageToName} />
          </div>
          <div className="pending-customer__details">
            {jobType === 'video' ? (
              <img
                className="pending-customer__job-type-icon"
                src={video}
                alt="video"
              />
            ) : null}
            {jobType === 'chat' ? (
              <img
                className="pending-customer__job-type-icon"
                src={chat}
                alt="chat"
              />
            ) : null}
            {jobType === 'image' ? (
              <img
                className="pending-customer__job-type-icon"
                src={image}
                alt="imageIcon"
              />
            ) : null}
            <p>{jobName}</p>
            <img
              className="accepted-and-completed-customer__job-type-icon"
              src={del}
              onClick={() => props.deleteJob(props.job._id, accessToken)}
              alt="arrow"
            />
          </div>
        </div>
      ) : (
        <div className="accepted-and-completed-customer">
          <div className="accepted-and-completed-customer__flag-container">
            <FlagComponent language={languageFromName} />
            <img
              className="accepted-and-completed-customer__bidirectional"
              src={bidirectional}
              alt="bidirectional"
            />
            <FlagComponent language={languageToName} />
          </div>
          <div className="accepted-and-completed-customer__details">
            {jobType === 'video' ? (
              <img
                className="accepted-and-completed-customer__job-type-icon"
                src={video}
                alt="video"
              />
            ) : null}
            {jobType === 'chat' ? (
              <img
                className="accepted-and-completed-customer__job-type-icon"
                src={chat}
                alt="chat"
              />
            ) : null}
            {jobType === 'image' ? (
              <img
                className="accepted-and-completed-customer__job-type-icon"
                src={image}
                alt="imageIcon"
              />
            ) : null}
            <p>{jobName}</p>
            <Link
              to={{
                pathname: `/app/customer/acceptedjob/${jobType}:${_id}`,
                state: props.job,
              }}
            >
              <img
                className="accepted-and-completed-customer__job-type-icon"
                src={arrow}
                alt="arrow"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PendingAndAcceptedCustomerJobTile;
