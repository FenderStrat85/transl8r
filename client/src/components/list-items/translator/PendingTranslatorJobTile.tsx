import { UserContext } from '../../../context/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FlagComponent from '../../flag-component/FlagComponent';

const PendingTranslatorJobTile = (props: { job: any }) => {
  const { user } = useContext(UserContext);
  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    jobDescription,
    _id,
  } = props.job;

  return (
    <div className='pending-translator-job-tile'>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <FlagComponent language={languageFromName} />
      <p>Language to: {languageToName}</p>
      <FlagComponent language={languageToName} />
      <Link
        to={{ pathname: '/app/translator/dashboard/viewjob', state: props.job }}
      >
        <button className='pending-translator-job-tile__button'>See more details:</button>
      </Link>
    </div>
  );
};

export default PendingTranslatorJobTile;
