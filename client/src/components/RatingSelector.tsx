var Rating = require('react-rating');

const RatingSelector = (): JSX.Element => {
  return (
    <>
      <Rating
        emptySymbol="fa fa-star-o fa-2x"
        fullSymbol="fa fa-star fa-2x"
        fractions={2}
      />
    </>
  );
};

export default RatingSelector;
