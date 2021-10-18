import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../../../services/apiService';
import { UserContext } from '../../../context/Context';
import { useContext } from 'react';

const PendingAndAcceptedCustomerJobTile = (props: {
  job: any;
}): JSX.Element => {
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');

  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    _id,
    notification,
  } = props.job;

  if (notification) {
    console.log(props.job);
    toast(`A translator has accepted your job named: ${jobName}`, {
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
            <button>Go to job:</button>
          </Link>
        </>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default PendingAndAcceptedCustomerJobTile;
