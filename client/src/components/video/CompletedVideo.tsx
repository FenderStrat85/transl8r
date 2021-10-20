import { useLocation } from 'react-router-dom';
import BackButton from '../button/BackButton';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';

const CompletedVideo = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const job: any = useLocation().state;

  return (
    <div className="completed-video">
      <h1 className="completed-video__header">Video Chat</h1>
      {user.role === 'customer' ? (
        <h2>You requested a translation through video about this topic: </h2>
      ) : (
        <h2>You helped another user via video chat on this topic: </h2>
      )}
      <p>"{job.jobDescription}"</p>
      <BackButton />
    </div>
  );
};

export default CompletedVideo;
