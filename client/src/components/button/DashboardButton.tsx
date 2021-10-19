import { useHistory } from 'react-router-dom';

const DashboardButton = (props: { role: string }): JSX.Element => {
  const role = props.role;
  const history = useHistory<History>();

  const toDashboard = (): void => {
    history.push(`/app/${role}/dashboard`);
  };

  return (
    <button type="button" onClick={toDashboard}>
      Go to Dashboard!
    </button>
  );
};

export default DashboardButton;
