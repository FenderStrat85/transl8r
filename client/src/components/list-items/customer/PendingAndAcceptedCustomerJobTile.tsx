import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../../../services/apiService';
import { useHistory } from 'react-router-dom';

const PendingAndAcceptedCustomerJobTile = (props: {
  job: any;
}): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory();

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
    <div className="pending-and-accepted-customer-job-tile">
      {status === 'pending' ? (
        <>
          <p>
            {' '}
            {jobName} : Status:{status} is a {jobType}
          </p>
          <p>Language from: {languageFromName}</p>
          <FlagComponent language={languageFromName} />
          <p>Language to: {languageToName}</p>
          <FlagComponent language={languageToName} />
        </>
      ) : (
        <>
          <p>
            {' '}
            {jobName} : Status:{status} is a {jobType}
          </p>
          <p>Language from: {languageFromName}</p>
          <FlagComponent language={languageFromName} />
          <p>Language to: {languageToName}</p>
          <FlagComponent language={languageToName} />
          <Link
            to={{
              pathname: `/app/customer/acceptedjob/${jobType}:${_id}`,
              state: props.job,
            }}
          >
            <button>Go to job</button>
          </Link>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default PendingAndAcceptedCustomerJobTile;
