import apiService from '../../services/Api.Service';
import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TranslatorJobDetail from './Translator.job.detail';

const TranslatorJobItem = (props: { job: any }) => {
  const { user } = useContext(UserContext);
  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    jobDescription,
  } = props.job;
  // console.log('user!!!', user);
  const acceptJob = async () => {
    const res = apiService.acceptJob(props.job, user.token);
  };

  return (
    <div>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
      <Link to={{ pathname: '/app/translator/dashboard/viewjob', state: props.job }}>
        <button>See more details:</button>
      </Link>
    </div>
  );
};

export default TranslatorJobItem;
