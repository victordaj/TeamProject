import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route, Link } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import history from './utils/history';

const routing = (
  <Router history={history}>
    <div>
      <Switch>
        <Route path = "/users" exact component={App} />
        <Route path = "/update" component={UpdateUser} /> 
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
