const JobItem = (props: { job: any }) => {
  const { jobName, status, jobType, languageFromName, languageToName } =
    props.job;
  console.log(props.job);
  return (
    <div>
      {jobName} : Status:{status} is a {jobType}
      <p>Language from: {languageFromName}</p>
      <p>Language to: {languageToName}</p>
    </div>
  );
};

export default JobItem;
