import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from '../Common';
 
// handle the private routes
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}