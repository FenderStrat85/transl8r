import { Link } from 'react-router-dom';

const PendingTranslatorJobTile = (props: { job: any }): JSX.Element => {
  const { jobName, status, jobType, languageFromName, languageToName } =
    props.job;

  return (
    <div>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
      <Link
        to={{ pathname: '/app/translator/dashboard/viewjob', state: props.job }}
      >
        <button>See more details:</button>
      </Link>
    </div>
  );
};

export default PendingTranslatorJobTile;
