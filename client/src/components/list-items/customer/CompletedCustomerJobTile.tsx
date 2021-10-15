import { useLocation, useHistory } from 'react-router-dom';

const CompletedCustomerJobTile = (props: { job: any }) => {
  const history = useHistory();

  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  console.log(props.job);

  const handleClick = () => {
    if (jobType === 'chat') {
      history.push(`/app/customer/${jobType}:${_id}`, {
        state: props.job,
      });
    }
    if (jobType === 'image') {
      history.push({
        pathname: `/app/customer/${jobType}:${_id}`,
        state: props.job,
      });
    }
    if (jobType === 'video') {
      history.push({
        pathname: `/app/customer/${jobType}:${_id}`,
        state: props.job,
      });
    }
  };

  return (
    <div>
      {jobName} : Status:{status}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
      <p>Job Type: {jobType}</p>
      <button onClick={handleClick}>See details</button>
    </div>
  );
};

export default CompletedCustomerJobTile;
