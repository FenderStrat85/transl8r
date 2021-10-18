import { Key } from 'react';
import PendingAndAcceptedCustomerJobTile from '../list-items/customer/PendingAndAcceptedCustomerJobTile';
import { useQuery, UseQueryResult } from 'react-query';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { IJob } from '../../interfaces/interfaces';

const server = process.env.REACT_APP_SERVER;

const CustomerJobList = (): JSX.Element => {
  const accessToken: string | null = localStorage.getItem('accessToken');

  const fetchPendingAndAcceptedJobs = async (): Promise<any> => {
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

  const result: UseQueryResult<any, unknown> = useQuery(
    'pendingJobs',
    fetchPendingAndAcceptedJobs,
    {
      refetchInterval: 5000,
    },
  );

  const status: string = result.status;
  const data: IJob[] = result.data;

  let pendingJobs: IJob[] = [];
  let acceptedJobs: IJob[] = [];

  if (data && data.length > 0) {
    // TODO: only one loop
    pendingJobs = data.filter(
      (job: { status: string }) => job.status === 'pending',
    );
    acceptedJobs = data.filter(
      (job: { status: string }) => job.status === 'accepted',
    );
  }

  return (
    <div className="customer-job-list">
      {/* PENDING JOB CONTAINER */}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'loading' && <div>Fetching data</div>}
      {status === 'success' && (
        <div className="customer-job-list__jobs--pending">
          <h2>Pending Jobs</h2>
          {pendingJobs.length > 0 ? (
            pendingJobs.map((job: { _id: Key }) => (
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
        <div className="customer-job-list__jobs--accepted">
          <h2>Accepted Jobs</h2>
          {acceptedJobs.length > 0 ? (
            acceptedJobs.map((job: { _id: Key }) => (
              <PendingAndAcceptedCustomerJobTile key={job._id} job={job} />
            ))
          ) : (
            <h3>No accepted jobs</h3>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerJobList;
