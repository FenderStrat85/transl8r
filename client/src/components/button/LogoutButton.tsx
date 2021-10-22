import logoutButton from './../../assets/icons/logout.svg';

const LogoutButton = (props: { logout: any }): JSX.Element => {
  return (
    <img
      className="logout-button"
      src={logoutButton}
      onClick={props.logout}
      alt="logout"
    />
  );
};

export default LogoutButton;
