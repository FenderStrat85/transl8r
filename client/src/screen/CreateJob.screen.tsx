import * as React from 'react';


const CreateJob = () => {

  const url = window.location.href;
  let product = url.match(/([^ /\d]+)[^/]*$/);

  return (<> <h1> {product} </h1> </>);
}

export default CreateJob;