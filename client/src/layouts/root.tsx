import { Switch, Route, Redirect } from 'react-router-dom';


import { useState } from 'react';

const Root = () => {
  return (
    <>
      <Switch>
        <Route path='/auth'></Route>
        <Route path='/app'></Route>
      </Switch>
    </>
  );
}

export default Root;