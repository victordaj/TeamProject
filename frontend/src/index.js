import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router, Switch, Route } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import history from './utils/history';
import UserContainer from './components/UserContainer';

const routing = (
  <Router history={history}>
      <Switch>
        <Route exact path = "/" component={App} />
        <Route exact path = "/users" component={UserContainer} />
        <Route exact path = "/users/:id" component={UpdateUser} />
      </Switch>
  </Router>
) 

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
