import { useHistory } from 'react-router-dom';
//import { useState } from 'react';
import FlagComponent from '../flag-component/FlagComponent';

import bidirectional from './../../assets/icons/bidirectional.svg';
import video from './../../assets/icons/video.svg';
import chat from './../../assets/icons/chat.svg';
import image from './../../assets/icons/image.svg';
import arrow from './../../assets/icons/arrow.svg';

const CompletedJobTile = (props: { job: any }): JSX.Element => {
  const history = useHistory();

  const { jobName, jobType, languageFromName, languageToName } = props.job;

  //const [showJob, setShowJob] = useState(false);

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
    //setShowJob(true);
  };

  return (
    <div className="translator-completed">
      <div className="translator-completed__flag-container">
        <FlagComponent language={languageFromName} />
        <img
          className="translator-completed__bidirectional"
          src={bidirectional}
          alt="bidirectional"
        />
        <FlagComponent language={languageToName} />
      </div>
      <div className="translator-completed__details">
        {jobType === 'video' ? (
          <img
            className="translator-completed__job-type-icon"
            src={video}
            alt="video Icon"
          />
        ) : null}
        {jobType === 'chat' ? (
          <img
            className="translator-completed__job-type-icon"
            src={chat}
            alt="Chat Icon"
          />
        ) : null}
        {jobType === 'image' ? (
          <img
            className="translator-completed__job-type-icon"
            src={image}
            alt="iconImage"
          />
        ) : null}
        <p> &nbsp;&nbsp;&nbsp;{jobName}</p>
        <img
          className="translator-completed__job-type-icon"
          src={arrow}
          onClick={handleClick}
          alt="arrow"
        />
      </div>
    </div>
  );
};

export default CompletedJobTile;
