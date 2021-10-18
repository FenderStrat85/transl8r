import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';

import bidirectional from './../../../assets/icons/bidirectional.svg';
import video from './../../../assets/icons/video.svg';
import chat from './../../../assets/icons/chat.svg';
import image from './../../../assets/icons/image.svg';
import arrow from './../../../assets/icons/arrow.svg';

const PendingTranslatorJobTile = (props: { job: any }): JSX.Element => {
  const { jobName, status, jobType, languageFromName, languageToName } =
    props.job;

  return (
    <div className="pending-translator">
      <div className="pending-translator__flag-container">
        <FlagComponent language={languageFromName} />
        <img
          className="pending-translator__bidirectional"
          src={bidirectional}
        />
        <FlagComponent language={languageToName} />
      </div>
      <div className="pending-translator__details">
        {jobType === 'video' ? (
          <img className="pending-translator__job-type-icon" src={video} />
        ) : null}
        {jobType === 'chat' ? (
          <img className="pending-translator__job-type-icon" src={chat} />
        ) : null}
        {jobType === 'image' ? (
          <img className="pending-translator__job-type-icon" src={image} />
        ) : null}
        <p> &nbsp;&nbsp;&nbsp;{jobName}</p>
        <Link
          to={{
            pathname: '/app/translator/dashboard/viewjob',
            state: props.job,
          }}
        >
          <img className="pending-translator__job-type-icon" src={arrow} />
        </Link>
      </div>
    </div>
  );
};

export default PendingTranslatorJobTile;
