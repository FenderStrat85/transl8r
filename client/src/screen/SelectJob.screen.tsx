import React from 'react';
import { Link } from 'react-router-dom';

function SelectJob() {

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
      <Link to='/app/customer/dashboard'>
        <button>View pending translations!!!</button>
      </Link>
    </>
  )
}

export default SelectJob;
