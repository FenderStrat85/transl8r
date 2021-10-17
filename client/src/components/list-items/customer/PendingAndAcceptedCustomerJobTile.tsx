import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';

const PendingAndAcceptedCustomerJobTile = (props: {
  job: any;
}): JSX.Element => {
  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  return (
    <div className='panding-and-accepted-customer-job-tile__container'>
      {status === 'pending' ? (
        <>
          <p> {jobName} : Status:{status} is a {jobType}</p>
          <p>Language from: {languageFromName}</p>
          <FlagComponent language={languageFromName} />
          <p>Language to: {languageToName}</p>
          <FlagComponent language={languageToName} />
        </>
      ) : (
        <>
          <p> {jobName} : Status:{status} is a {jobType}</p>
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
    </div>
  );
};

export default PendingAndAcceptedCustomerJobTile;
