import { UserContext } from '../../services/Context';
import { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import apiService from '../../services/Api.Service';

export const TranslatorJobDetail = (props) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const jobInfoPassedFromPrevPage = useLocation();

  const {
    jobName,
    status,
    jobType,
    languageFromName,
    languageToName,
    jobDescription,
  } = jobInfoPassedFromPrevPage.state;

  console.log('jobInfoPassedFromPreviousPage', jobInfoPassedFromPrevPage);

  const acceptJob = async () => {
    const res = await apiService.acceptJob(
      jobInfoPassedFromPrevPage.state,
      accessToken,
    );
    console.log('res from translatorJobDetail', res);
    if (res.status === 'accepted') {
      jobAccepted = true;
      history.push(`/app/translator/${res.jobType}:${res._id}`, {
        state: res,
      });
    }
  };

  let jobAccepted = false;

  return (
    <>
      {!jobAccepted ? (
        <div>
          <h1>Job detail</h1>
          <h1>{user.firstName}</h1>
          <h1>{jobType}</h1>
          <h3>{jobDescription}</h3>

          <button onClick={() => acceptJob()}>Accept this job</button>
        </div>
      ) : (
        <h1>Awesome, you've accepted!</h1>
      )}
    </>
  );
};

export default TranslatorJobDetail;
