import { useHistory } from 'react-router-dom';
import backIcon from './../../assets/icons/back-button.svg';

const BackButton = (): JSX.Element => {
  const history = useHistory<History>();
  const goBack = (): void => {
    history.goBack();
  };

  return <img className="back-button" src={backIcon} onClick={goBack}></img>;
};
export default BackButton
