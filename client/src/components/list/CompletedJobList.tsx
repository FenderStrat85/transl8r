import React from 'react';
import CompletedCustomerJobTile from './../list-items/customer/CompletedCustomerJobTile';
import { UserContext } from '../../context/Context';
import { useContext } from 'react';
import { useQuery } from 'react-query';
const server = process.env.REACT_APP_SERVER;

const CompletedJobList = () => {
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

  const { data, status } = useQuery('completed', fetchCompletedJobs, {
    refetchInterval: 5000,
  });

  return (
    <>
      <div>
        <h2>Completed Jobs</h2>
        {status === 'error' && <div>Error fetching data</div>}
        {status === 'loading' && <div>Fetching data</div>}
        {status === 'success' && (
          <div>
            {data.length > 0 ? (
              data.map((job) => (
                <CompletedCustomerJobTile key={job._id} job={job} />
              ))
            ) : (
              <h3>No completed jobs</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CompletedJobList;
