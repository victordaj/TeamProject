import CreateUser from './components/CreateUser';
import UserList from './components/UserList'
import React from 'react';
import ReactDOM from 'react-dom';
import axios from './utils/axios';

class UserContainer extends React.Component {

  state = {
    userInput: []
  }

  error = err => {
    console.log(err);
    alert("Error");
  }

  getUsers = () => {
    axios.get('/users').then(response => {
      this.setState({userInput: response.data})
    }).catch(err => {
      this.error(err)
    })
  }

  deleteUser = userId => {
    if(window.confirm("Are you sure?")) {
      axios.put('/users/' + userId, { isActive: false}).then(() => {
        this.getUsers();
      }).catch(err => {
        this.error(err);
      })
    }
  }

  createUser = user => {
    if(user.firstName && user.lastName && user.password && user.birthday) {
      axios.post('/users', user).then(() => {
        this.getUsers();
      }).catch(err => {
        this.error(err);
      })
    } else alert("Please complete all the fields")
  }

  updateUser = userId => {
    let firstName = window.prompt("First name");
    let lastName = window.prompt("Last name");
    let password = window.prompt("Password")
    if(firstName && lastName && password) {
      axios.put('/users/' + userId, {
        firstName: firstName, 
        lastName: lastName, 
        password: password }).then(() => {
          this.getUsers();
        }).catch(err => {
          this.error(err);
        })
    } else alert("Please complete all the fields")
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <CreateUser onCreate={this.createUser} />
        <UserList list={this.state.userInput} onDelete={this.deleteUser} onUpdate={this.updateUser} />
      </div>
    )
  }
}

export default UserContainer;
