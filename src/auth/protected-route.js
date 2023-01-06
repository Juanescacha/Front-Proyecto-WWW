import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
//import { Loading } from '../components/index'
import { Spinner } from 'react-bootstrap'

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Spinner />,
    })}
    {...args}
  />
);

export default ProtectedRoute;