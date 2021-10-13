const TranslatorJobItem = (props: { job: any }) => {
  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    jobDescription,
  } = props.job;
  console.log(props.job);
  return (
    <div>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
      <button>Click me for more info</button>
    </div>
  );
};

export default TranslatorJobItem;
