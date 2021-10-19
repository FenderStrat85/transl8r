import { useHistory } from 'react-router-dom';

const BackButton = (): JSX.Element => {
  const history = useHistory<History>();
  const goBack = (): void => {
    history.goBack();
  };

  return (
    <button type="button" onClick={goBack}>
      Go back
    </button>
  );
};
export default BackButton;
