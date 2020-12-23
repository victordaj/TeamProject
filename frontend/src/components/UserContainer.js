import CreateUser from './CreateUser';
import UserList from './UserList';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios';
import history from '../utils/history';

class UserContainer extends React.Component {

  state = {
    userInput: []
  }

  error = err => {
    console.log(err);
    alert("Error");
  }

  getUsers = () => {
    axios.get('/users/').then(response => {
      this.setState({userInput: response.data})
    }).catch(err => {
      this.error(err)
    })
  }

  deleteUser = userId => {
    if(window.confirm("Are you sure?")) {
      axios.delete('/users/' + userId, { isActive: false}).then(() => {
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
    history.push('/users/' + userId);
  }

  checkItems = userId => {
    history.push('/users/' + userId + '/items/');
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div>
        <CreateUser onCreate={this.createUser} />
        <UserList list={this.state.userInput} onDelete={this.deleteUser} onUpdate={this.updateUser} onCheck = {this.checkItems} />
      </div>
    )
  }
}

export default UserContainer;
