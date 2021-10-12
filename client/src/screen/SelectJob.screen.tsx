import React from 'react';
import { Link } from 'react-router-dom';

function CreateJob() {

  return (
    <>
      <Link to='/app/customer/createJob/espresso'>
        <button>Espresso</button>
      </Link>
      <Link to='/app/customer/createJob/venti'>
        <button>Venti</button>
      </Link>
      <Link to='/app/customer/createJob/grande'>
        <button>Grande</button>
      </Link>
    </>
  )
}

export default CreateJob;
