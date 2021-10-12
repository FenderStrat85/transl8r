import * as React from 'react';


const CreateJob = () => {

  const url = window.location.href;
  let product = url.match(/([^ /\d]+)[^/]*$/);
  console.log(product);

  return (<> <h1> {product} </h1> </>);
}

export default CreateJob;