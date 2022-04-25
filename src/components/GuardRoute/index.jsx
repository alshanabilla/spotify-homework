import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function GuardRoute({ children, type, ...props }) {
  const isAuthorize = useSelector((state) => state.auth.isAuthorize);

  if (type === 'guest') {
    return (
      <Route {...props}>
        {!isAuthorize ? children : <Redirect to="/create-playlist" />}
      </Route>
    )
  }

  return (
    <Route {...props}>
      {isAuthorize ? children : <Redirect to="/" />}
    </Route>
  )
}