import apiService from '../../../services/apiService';
import { UserContext } from '../../../context/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TranslatorPendingJobDetails from '../../job-details/TranslatorPendingJobDetails';

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
    <div className='pending-translator-job-tile__container'>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
      <Link
        to={{ pathname: '/app/translator/dashboard/viewjob', state: props.job }}
      >
        <button className='pending-translator-job-tile__button'>See more details:</button>
      </Link>
    </div>
  );
};

export default PendingTranslatorJobTile;
