// import { useHistory } from 'react-router-dom';
import logoutButton from './../../assets/icons/logout.svg';

const LogoutButton = (props: { logout: any }): JSX.Element => {
  return (
    <img className='logout-button' src={logoutButton} onClick={props.logout} />
  );
};

export default LogoutButton;
