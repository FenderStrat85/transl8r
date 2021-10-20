import { Link } from 'react-router-dom';

import video from './../assets/icons/video-blue.svg';
import chat from './../assets/icons/chat-blue.svg';
import image from './../assets/icons/camera-blue.svg';

const SelectJob = (): JSX.Element => {
  return (
    <div className="select-job-screen">
      <h1>Translation</h1>
      <h2>
        Please select the type of <br /> translation you require:
      </h2>
      <div className="select-job-screen__button-container">
        <Link to="/app/customer/createJob/espresso">
          <img
            className="select-job-screen__job-type-icon"
            src={image}
            alt="translationImage"
          />
        </Link>
        <Link to="/app/customer/createJob/cappuccino">
          <img
            className="select-job-screen__job-type-icon"
            src={chat}
            alt="chat translation"
          />
        </Link>
        <Link to="/app/customer/createJob/macchiato">
          <img
            className="select-job-screen__job-type-icon"
            src={video}
            alt="video translation"
          />
        </Link>
      </div>
      <Link to="/app/customer/dashboard">
        <button className="select-job-screen__button">Dashboard</button>
      </Link>
    </div>
  );
};

export default SelectJob;
