import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react';
import FlagComponent from '../flag-component/FlagComponent';

import bidirectional from './../../assets/icons/bidirectional.svg';
import video from './../../assets/icons/video.svg';
import chat from './../../assets/icons/chat.svg';
import image from './../../assets/icons/image.svg';
import arrow from './../../assets/icons/arrow.svg';

const CompletedJobTile = (props: { job: any }): JSX.Element => {
  const history = useHistory();

  const { jobName, status, jobType, languageFromName, languageToName } =
    props.job;

  const [showJob, setShowJob] = useState(false);

  const handleClick = (): void => {
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
    // <div className="completed-job-tile">
    //   <p>
    //     {jobName} : Status:{status}
    //   </p>
    //   <FlagComponent language={languageFromName} />
    //   <FlagComponent language={languageToName} />
    //   <p>Job Type: {jobType}</p>
    //   <button className="completed-job-tile__button" onClick={handleClick}>
    //     See details
    //   </button>
    // </div>
    <div className="translator-completed">
      <div className="translator-completed__flag-container">
        <FlagComponent language={languageFromName} />
        <img
          className="translator-completed__bidirectional"
          src={bidirectional}
        />
        <FlagComponent language={languageToName} />
      </div>
      <div className="translator-completed__details">
        {jobType === 'video' ? (
          <img className="translator-completed__job-type-icon" src={video} />
        ) : null}
        {jobType === 'chat' ? (
          <img className="translator-completed__job-type-icon" src={chat} />
        ) : null}
        {jobType === 'image' ? (
          <img className="translator-completed__job-type-icon" src={image} />
        ) : null}
        <p> &nbsp;&nbsp;&nbsp;{jobName}</p>
        <img className="translator-completed__job-type-icon" src={arrow} onClick={handleClick} />
      </div>
    </div>
  );
};

export default CompletedJobTile;
