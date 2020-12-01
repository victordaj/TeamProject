import React from 'react';

import ReactDOM from 'react-dom';

import axios from '../utils/axios'


class UpdateUser extends React.Component {
    state = {
        firstName : '',
        lastName : '',
        password : '',
        birthday : ''
    }

    getUsers = () => {
        axios.get('/users').then(response => {
          this.setState({firstName : response.firstName, lastName : response.lastName, password : response.password,birthday : response.birthday})
        }).catch(err => {
          this.error(err)
        })
      }

    componentDidMount() {
        this.getUsers()
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        this.props.onUpdate({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            password : this.state.password,
            birthday : new Date(this.state.birthday)
        })
    }

    render() {
        return  <div>
                    <p><input name='firstName' type='text' onChange={this.onChange} value={this.state.firstName}  /></p>
                    <p><input name='lastName' type='text' onChange={this.onChange} value={this.state.lastName}  /></p>
                    <p><input name='password' type='text' onChange={this.onChange} value={this.state.password}  /></p>
                    <p><input name='birthday' type='date' onChange={this.onChange} value={this.state.date} /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}
export default UpdateUser