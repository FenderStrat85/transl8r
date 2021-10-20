import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';

const CompletedVideo = (): JSX.Element => {
  const job: any = useLocation().state;

  return (
    <div className='completed-video'>
      <h1 className='completed-video__header'>Video Chat</h1>
      <h2>
        You requested a translation through video about this topic:{' '}
      </h2>
      <p>"{job.jobDescription}"</p>

      {/* <h3>Hoping you've been able to find a good translation</h3> */}
      <BackButton />
    </div>
  );
};

export default CompletedVideo;
