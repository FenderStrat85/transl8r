const ErrorMessageComponent = (props: { message: string }): JSX.Element => {
  const { message } = props;
  return (
    <>
      {' '}
      <h1>{message}</h1>{' '}
    </>
  );
};

export default ErrorMessageComponent;
