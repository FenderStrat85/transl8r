import React from 'react';
import CustomerJobItem from '../items/CustomerJob.item';
import CustomerAcceptedJobItem from '../items/Customer.accepted.job.item';
import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { server } from '../../constants/server';
import { useQuery } from 'react-query';

const CompletedJobs = () => {
  const accessToken = localStorage.getItem('accessToken');

  const fetchCompletedJobs = async () => {
    const res = await fetch(`${server}/getJobs/completed`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  };

  const { data, status } = useQuery('pendingJobs', fetchCompletedJobs, {
    refetchInterval: 5000,
  });

  return (
    <>
      <div>
        {console.log(data)}
        <h2>Completed Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {data.length > 0 ? (
              data.map((job) => <CustomerJobItem key={job._id} job={job} />)
            ) : (
              <h3>No completed jobs</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedJobs;
