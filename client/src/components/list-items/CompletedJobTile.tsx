import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import FlagComponent from '../flag-component/FlagComponent';

const CompletedJobTile = (props: { job: any }) => {
  const history = useHistory();

  const { jobName, status, jobType, languageFromName, languageToName, _id } =
    props.job;
  const [showJob, setShowJob] = useState(false);

  const handleClick = () => {
    if (jobType === 'chat') {
      history.push(`/app/customer/${jobType}/completed`, {
        state: props.job,
      });
    }
    if (jobType === 'image') {
      history.push({
        // pathname: `/app/customer/${jobType}:${_id}`,
        pathname: `/app/customer/${jobType}/completed`,
        state: props.job,
      });
    }
    if (jobType === 'video') {
      history.push({
        // pathname: `/app/customer/${jobType}:${_id}`,
        pathname: `/app/customer/${jobType}/completed`,
        state: props.job,
      });
    }
    setShowJob(true);
  };

  return (
    <div className='completed-job-tile__container'>
      <p>{jobName} : Status:{status}</p>
      <p>Language from: {languageFromName}</p>
      <FlagComponent language={languageFromName} />
      <p>Language to: {languageToName}</p>
      <FlagComponent language={languageToName} />
      <p>Job Type: {jobType}</p>
      <button className='completed-job-tile__button' onClick={handleClick}>See details</button>
    </div>
  );
};

export default CompletedJobTile;
