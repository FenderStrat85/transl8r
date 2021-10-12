const JobSpecific = (props: {
  job: {
    jobDescription: string;
    jobName: string;
    jobType: string;
    status: string;
    imageUrl: string;
  };
}) => {
  const { jobDescription, jobName, jobType, status, imageUrl } = props.job;

  return (
    <>
      <div>
        <h1>
          {jobName} that is a {jobType} with a status of {status}{' '}
        </h1>
        <textarea> {jobDescription}</textarea>
        {imageUrl ? (
          <img src={imageUrl} alt={jobName} />
        ) : (
          <p> url of chat or video chat maybe ? </p>
        )}
      </div>
    </>
  );
};

export default JobSpecific;
