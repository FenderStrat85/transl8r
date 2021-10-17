import { useHistory } from 'react-router-dom';

const DashboardButton = (props: { role: string }): JSX.Element => {
  const role = props.role;
  const history = useHistory();

  const toTranslatorDashboard = (): void => {
    history.push(`/app/${role}/dashboard`);
  };

  return (
    <button type="button" onClick={toTranslatorDashboard}>
      Go to Dashboard!
    </button>
  );
};

export default DashboardButton;
