
const JobItem = (props: { job: any }) => {
  const { jobName, status, jobType, dateCompleted } = props.job
  return (
    <div>
      {jobName} : {status} is a {jobType} and {dateCompleted} ended?
    </div>);
}

export default JobItem;