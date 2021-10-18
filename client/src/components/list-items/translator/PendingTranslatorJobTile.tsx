import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';

import bidirectional from './../../../assets/icons/bidirectional.svg';

const PendingTranslatorJobTile = (props: { job: any }): JSX.Element => {
  const { jobName, status, jobType, languageFromName, languageToName } =
    props.job;

  return (
    <div className="pending-translator">
      {jobName} : Status:{status} is a {jobType}
      <div className="pending-translator__tile">
        <FlagComponent language={languageFromName} />
        <img
          className="pending-translator__bidirectional"
          src={bidirectional}
        />
        <FlagComponent language={languageToName} />
      </div>
      <Link
        to={{ pathname: '/app/translator/dashboard/viewjob', state: props.job }}
      >
        <button className="pending-translator-job-tile__button">
          See more details:
        </button>
      </Link>
    </div>
  );
};

export default PendingTranslatorJobTile;
