import React from 'react';
import JobItem from '../items/Job.item';
import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { server } from '../../constants/server';
import { useQuery } from 'react-query';

const CustomerJobList = (props: { jobs: any }) => {
  const { user } = useContext(UserContext);

  const fetchPendingAndAcceptedJobs = async () => {
    const res = await fetch(`${server}/getJobs/pendingAndAccepted`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    return res.json();
  };

  const { data, status } = useQuery(
    'pendingJobs',
    fetchPendingAndAcceptedJobs,
    {
      refetchInterval: 5000,
    },
  );

  const jobs = props.jobs;
  const listJobs = jobs.map((job: any) => {
    <li>
      <JobItem job={job} />
    </li>;
  });

  <ul>{listJobs}</ul>;

  return (
    <div>
      <h2>Pending Jobs</h2>
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div>
          {data.map((job) => (
            <JobItem key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerJobList;
