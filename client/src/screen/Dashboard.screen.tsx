import JobList from "../components/list/Job.list";
import { UserContext } from "../services/Context";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // API GET JOBS
    //setJobs(response)
  }, []);



  return (<>
    {user &&
      <div>
        <h1> {user.role}Dashboard</h1>
        <JobList jobs={jobs} />
      </div>}
  </>);
}

export default Dashboard;