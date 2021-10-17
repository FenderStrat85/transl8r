import React from 'react';
import PendingAndAcceptedCustomerJobTile from '../list-items/customer/PendingAndAcceptedCustomerJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
const server = process.env.REACT_APP_SERVER;

const CustomerJobList = () => {
  const accessToken = localStorage.getItem('accessToken');

  const fetchPendingAndAcceptedJobs = async () => {
    const res = await fetch(`${server}/getJobs/pendingAndAccepted`, {
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

  const { data, status } = useQuery(
    'pendingJobs',
    fetchPendingAndAcceptedJobs,
    {
      refetchInterval: 5000,
    },
  );

  let pendingJobs = [];
  let acceptedJobs = [];

  if (data && data.length > 0) {
    // TODO: only one loop
    pendingJobs = data.filter((job) => job.status === 'pending');
    acceptedJobs = data.filter((job) => job.status === 'accepted');
  }

  return (
    <div className='customer-job-list'>
      {/* PENDING JOB CONTAINER */}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div className='customer-job-list__jobs--pending'>
          <h2>Pending Jobs</h2>
          {pendingJobs.length > 0 ? (
            pendingJobs.map((job) => (
              <PendingAndAcceptedCustomerJobTile key={job._id} job={job} />
            ))
          ) : (
            <h3>No pending jobs</h3>
          )}
        </div>
      )}
      {/* ACCEPTED JOB CONTAINER */}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div className='customer-job-list__jobs--accepted'>
          <h2>Accepted Jobs</h2>
          {acceptedJobs.length > 0 ? (
            acceptedJobs.map((job) => (
              <PendingAndAcceptedCustomerJobTile key={job._id} job={job} />
            ))
          ) : (
            <h3>No accepted jobs</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerJobList;
