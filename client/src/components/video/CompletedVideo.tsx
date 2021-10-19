import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';

const CompletedVideo = (): JSX.Element => {
  const job: any = useLocation().state;

  return (
    <div>
      <h2>
        You have requested a translation through video about this topic :{' '}
      </h2>
      <h3>{job.jobDescription}</h3>

      <h3>Hoping you've been able to find a good translation</h3>
      <BackButton />
    </div>
  );
};

export default CompletedVideo;
