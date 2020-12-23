import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';
import history from './utils/history';
import UserContainer from './components/UserContainer';
import ItemContainer from './components/ItemContainer';
import UpdateItem from './components/UpdateItem';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';
import axios from './utils/axios';


const Routing = () => {
  let [render, setRender] = useState(false)
  let [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    axios.get('/isLogged').then(() => {
      setRender(true)
      setIsLogged(true)
    }).catch(() => {
      setRender(true)
      setIsLogged(false)
    })
  }, [])

  return render ? (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {isLogged ?
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/users" component={UserContainer} />
            <Route exact path="/users/:id" component={UpdateUser} />
            <Route exact path="/users/:id/items/" component={ItemContainer} />
            <Route exact path="/users/:id/items/:item_id" component={UpdateItem} />         
          </Switch> : 
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/resetPassword" component={ResetPassword}/> 
          </Switch>
          }
      </Router>
    </ThemeProvider>
  ) : null
}

ReactDOM.render(<Routing />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
