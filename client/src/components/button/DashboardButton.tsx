import { useHistory } from 'react-router-dom';

const DashboardButton = (props: { role: string }) => {
  const role = props.role;
  const history = useHistory();

  const toTranslatorDashboard = () => {
    history.push(`/app/${role}/dashboard`);
  };

  return (
    <button type="button" onClick={toTranslatorDashboard}>
      Go to Dashboard!
    </button>
  );
};

export default DashboardButton;