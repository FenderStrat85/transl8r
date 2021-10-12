import React from 'react';
import { Link } from 'react-router-dom';

function SelectJob() {

  return (
    <>
      <Link to='/app/customer/createJob/espresso'>
        <button>Espresso</button>
      </Link>
      <Link to='/app/customer/createJob/cappuccino'>
        <button>Cappuccino</button>
      </Link>
      <Link to='/app/customer/createJob/macchiato'>
        <button>Macchiato</button>
      </Link>
      <Link to='/app/customer/dashboard'>
        <button>View pending translations!!!</button>
      </Link>
    </>
  )
}

export default SelectJob;
