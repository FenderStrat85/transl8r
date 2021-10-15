const ImageDetails = (props: {
  job: { imageUrl: string; imageUrlTranslated: string; translatedText: string };
}): JSX.Element => {
  const { imageUrl, imageUrlTranslated, translatedText } = props.job;
  return (
    <>
      <h2> Image Job : </h2>
      <div>
        <p>You have requested a translation for this image: </p>
        <img src={imageUrl} alt="user" style={{ width: '50%' }} />
      </div>
      <div>
        <p>and you have recieved this translation and this helper text: </p>
        <img
          src={imageUrlTranslated}
          alt="translator"
          style={{ width: '50%' }}
        />
        {translatedText}
      </div>
      <div>Hoping you liked it don't forget to ratethe translator !</div>
    </>
  );
};

export default ImageDetails;
