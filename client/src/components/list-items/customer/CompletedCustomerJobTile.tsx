import { useLocation, useHistory } from 'react-router-dom';
import { useState } from 'react';
import CompletedChat from '../../chat/CompletedChat';

const CompletedCustomerJobTile = (props: { job: any }) => {
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
        pathname: `app/customer/${jobType}/completed`,
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
  //set the component to show based on jobType
  // let component

  // const componentToShowFunction = (jobType) => {
  //   if(jobType === 'image') {
  //     component = <CompletedImage job={job}/>
  //   }
  // }

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

export default CompletedCustomerJobTile;
