import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { useContext } from 'react';

import video from './../assets/icons/video-blue.svg';
import chat from './../assets/icons/chat-blue.svg';
import image from './../assets/icons/camera-blue.svg';

const SelectJob = (): JSX.Element => {
  const { user, logout } = useContext(UserContext);
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory();

  return (
    <div className="select-job-screen">
      <div className="select-job-screen__header">
        <h1>Translation</h1>
      </div>
      <h2>
        Please select the type of <br /> translation you require:
      </h2>
      <div className="select-job-screen__button-container">
        <Link to="/app/customer/createJob/espresso">
          <img className="select-job-screen__job-type-icon" src={image} />
          {/* <button className='select-job-screen__button'>Espresso</button> */}
        </Link>
        <Link to="/app/customer/createJob/cappuccino">
          <img className="select-job-screen__job-type-icon" src={chat} />
          {/* <button className='select-job-screen__button'>Cappuccino</button> */}
        </Link>
        <Link to="/app/customer/createJob/macchiato">
          <img className="select-job-screen__job-type-icon" src={video} />
          {/* <button className='select-job-screen__button'>Macchiato</button> */}
        </Link>
      </div>
      <Link to="/app/customer/dashboard">
        <button className="select-job-screen__button">Dashboard</button>
      </Link>
    </div>
  );
};

export default SelectJob;
