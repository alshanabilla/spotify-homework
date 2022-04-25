import { useLocation, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Authorize from './pages/Auth';
import GuardRoute from './components/GuardRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './slice/auth-slice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessTokenState = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const expiredDate = localStorage.getItem('expiredDate');

      if (expiredDate < +new Date()) {
        dispatch(logout());
      } else if (!accessTokenState) {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(login({
          accessToken,
          user,
          expiredDate,
        }));
      }
    }
  }, [accessTokenState, dispatch, location.pathname]);

  return (
    <Switch>
      <GuardRoute path="/create-playlist" type="private" exact>
        <Home />
      </GuardRoute>
      <GuardRoute path="/" type="guest" exact>
        <Authorize />
      </GuardRoute>
    </Switch>
  );
}

export default App;
