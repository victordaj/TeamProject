import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router, Switch, Route } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import history from './utils/history';
import UserContainer from './components/UserContainer';
import ItemContainer from './components/ItemContainer';
import UpdateItem from './components/UpdateItem';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';

const routing = (
  <ThemeProvider theme={theme}>
    <Router history={history}>
        <Switch>
          <Route exact path = "/" component={App} />
          <Route exact path = "/users" component={UserContainer} />
          <Route exact path = "/users/:id" component={UpdateUser} />
          <Route exact path = "/users/:id/items/" component={ItemContainer} />
          <Route exact path = "/users/:id/items/:item_id" component={UpdateItem} />
        </Switch>
    </Router>
  </ThemeProvider>
) 

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
