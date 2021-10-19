import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { useContext } from 'react';

import video from './../assets/icons/video.svg';
import chat from './../assets/icons/chat.svg';
import image from './../assets/icons/image.svg';



const SelectJob = (): JSX.Element => {
  const { user, logout } = useContext(UserContext);
  const accessToken: string | null = localStorage.getItem('accessToken');
  const history = useHistory();

  const logoutFromApp = (): void => {
    logout(accessToken as string);
    console.log('accessToken', accessToken);
    console.log('accessToken', user);
    history.push(`/auth/login`);
  };
  return (
    <div className='select-job-screen'>
      <div className='select-job-screen__header'>
        <h1>Translation</h1>
      </div>
      <h1>Please select a translation type:</h1>
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
      <Link to="/app/customer/dashboard">
        <button className='select-job-screen__button'>View pending translations!!!</button>
      </Link>
      <button className='select-job-screen_button' onClick={logoutFromApp}>Logout</button>
    </div>
  );
};

export default SelectJob;
