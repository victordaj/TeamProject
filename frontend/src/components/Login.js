import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios'
import history from '../utils/history';
import UserContainer from './UserContainer';

class Login extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        password: ''
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        if(this.state.firstName && this.state.password){
            axios.post('/login', { firstName: this.state.firstName, password: this.state.password }).then(user => {
                console.log(user)
                if(user.data.password === this.state.password) {
                    alert("Succesfull login!");
                    window.location.href = '/users'
                } else {
                    alert("Invalid credentials!");
                }
            }).catch(err => {
                console.log(err);
                alert("Error");
            })
        } else {
            alert("Please complete all fields!")
        }
    }

    render() {
        return  <div>
                    <p><input name='firstName' type='text' onChange={this.onChange} value={this.state.firstName} placeholder='First name' /></p>
                    <p><input name='password' type='password' onChange={this.onChange} value={this.state.password} placeholder="Password" /></p>
                    
                    <button onClick={this.submitForm}>Login</button>
                </div>
    }
}

export default Login;