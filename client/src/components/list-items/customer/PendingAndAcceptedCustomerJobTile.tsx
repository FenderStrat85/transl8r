import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';

const PendingAndAcceptedCustomerJobTile = (props: { job: any }) => {
  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  return (
    <div>
      {status === 'pending' ? (
        <div>
          {jobName} : Status:{status} is a {jobType}
          <p>Language from: {languageFromName}</p>
          <FlagComponent language={languageFromName} />
          <p>Language to: {languageToName}</p>
          <FlagComponent language={languageToName} />
        </div>
      ) : (
        <div>
          {jobName} : Status:{status} is a {jobType}
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
        </div>
      )}
    </div>
  );
};

export default PendingAndAcceptedCustomerJobTile;
