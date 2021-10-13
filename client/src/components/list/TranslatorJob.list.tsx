import React from 'react';
import TranslatorJobItem from '../items/TranslatorJob.item';
import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { server } from '../../constants/server';
import { useQuery } from 'react-query';

const TranslatorJobList = (props: { jobs: any }) => {
  const { user } = useContext(UserContext);

  const fetchPendingJobs = async () => {
    if (user.token) {
      console.log('usertoken in frontend', user.token);
      const res = await fetch(`${server}/getAvailableJobs`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      return res.json();
    }
  };

  const { data, status } = useQuery('pendingJobs', fetchPendingJobs, {
    refetchInterval: 1000,
  });

  const jobs = props.jobs;
  const listJobs = jobs.map((job: any) => {
    <li>
      <TranslatorJobItem job={job} />
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
            <TranslatorJobItem key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TranslatorJobList;