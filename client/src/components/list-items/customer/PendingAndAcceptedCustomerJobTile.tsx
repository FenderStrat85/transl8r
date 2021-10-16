import { Link } from 'react-router-dom';
import FlagComponent from '../../flags/Flag';

const PendingAndAcceptedCustomerJobTile = (props: { job: any }) => {
  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  return (
    <div>
      {status === 'pending' ? (
        <div>
          {jobName} : Status:{status} is a {jobType}
          <p>Language from: {languageFromName}</p>
          <p>Language to: {languageToName}</p>
        </div>
      ) : (
        <div>
          {jobName} : Status:{status} is a {jobType}
          <p>Language from: {languageFromName}</p>
          <FlagComponent />
          <p>Language to: {languageToName}</p>
          <FlagComponent />
          <Link
            to={{
              pathname: `/app/customer/acceptedjob/${jobType}:${_id}`,
              state: props.job,
            }}
          >
            <button>Go to job:</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PendingAndAcceptedCustomerJobTile;
