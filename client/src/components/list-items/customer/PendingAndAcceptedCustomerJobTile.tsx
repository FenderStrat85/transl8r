import { Link } from 'react-router-dom';

const PendingAndAcceptedCustomerJobTile = (props: { job: any }) => {
  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  console.log(props.job);
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
          <p>Language to: {languageToName}</p>
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
