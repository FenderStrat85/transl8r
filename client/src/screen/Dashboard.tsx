import CustomerJobList from '../components/list/CustomerJobList';
import TranslatorJobList from '../components/list/TranslatorJobList';
import { UserContext } from '../context/Context';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import button from '../assets/icons/logout.svg';
import backIcon from '../assets/icons/back-button.svg';

const Dashboard = (): JSX.Element => {
  const history = useHistory();
  const logoutButton: string = button;
  const { user, logout } = useContext(UserContext);
  const accessToken: any = localStorage.getItem('accessToken');

  const logoutFromApp = (): void => {
    logout(accessToken as string);
    history.push(`/auth/login`);
  };

  const goToCompletedJobs = (): void => {
    history.push(`/app/completedJobs`);
  };

  const toSelectJob = (): void => {
    history.push(`/app/customer/selectjob`);
  };

  return (
    <div className="dashboard-screen">
      {user.role === 'customer' ? (
        <>
          <div className="dashboard-screen__header">
            <img
              className="dashboard-screen__logout-button"
              src={logoutButton}
              alt="logout button"
              onClick={logoutFromApp}
            />
            <h1>Dashboard</h1>
          </div>
          <CustomerJobList />
          {/* <button className='dashboard-screen__button' onClick={goToCompletedJobs}>
            Take me to my completed jobs!
          </button> */}
          <img
            className="back-button"
            src={backIcon}
            onClick={toSelectJob}
          ></img>
          {/* <button className='dashboard-screen__button' onClick={logoutFromApp}>Logout</button> */}
        </>
      ) : (
        <>
          {/* <div className="dashboard-screen__header"> */}
          <img
            className="dashboard-screen__logout-button"
            src={logoutButton}
            alt="logout button"
            onClick={logoutFromApp}
          />
          <h1>Dashboard</h1>
          {/* </div> */}
          <TranslatorJobList />
          {/* <button className='dashboard-screen__button' onClick={logoutFromApp}>Logout</button> */}
        </>
      )}
      <button className="dashboard-screen__button" onClick={goToCompletedJobs}>
        My completed translations
      </button>
    </div>
  );
};

export default Dashboard;
