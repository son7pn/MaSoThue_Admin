import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from 'utils/history';
import Loadable from 'react-loadable';
import 'antd/dist/antd.css'
import 'assets/scss/_style.scss';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const DefaultLayout = Loadable({
  loader: () => import('src/layouts/DefaultLayout'),
  loading
});

const LoginPage = Loadable({
  loader: () => import('modules/Auth/_views/Login'),
  loading
});

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" name="Login" component={LoginPage} />
        <Route path="/" name="Home" component={DefaultLayout} />
      </Switch>
    </Router>
  );
}
export default App;
