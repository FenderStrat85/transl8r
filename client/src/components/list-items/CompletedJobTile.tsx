import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import CompletedChat from '../chat/CompletedChat';

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
    <div>
      <div>
        {jobName} : Status:{status}
        <p>Language from: {languageFromName}</p>
        <p>Language to: {languageToName}</p>
        <p>Job Type: {jobType}</p>
        <button onClick={handleClick}>See details</button>
      </div>
    </div>
  );
};

export default CompletedJobTile;
