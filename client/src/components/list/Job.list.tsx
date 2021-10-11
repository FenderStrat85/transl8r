import JobItem from "../items/Job.item";

const JobList = (props: { jobs: any }) => {
  const jobs = props.jobs
  const listJobs = jobs.map((job: any) => {
    <li><JobItem job={job} /></li>
  })

  return (<ul>
    {listJobs}
  </ul>);
}

export default JobList;