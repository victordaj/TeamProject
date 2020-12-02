import React from 'react';

import ReactDOM from 'react-dom';

import axios from '../utils/axios'

import history from '../utils/history';


class UpdateUser extends React.Component {
    state = {
        firstName : '',
        lastName : '',
        password : '',
        birthday : ''
    }

    getUser = userId => {
        axios.get('/users/' + userId).then(response => {
          this.setState({ ...response.data })
        }).catch(err => {
          console.log('eroare');
        })
      }

    componentDidMount() {
        let aux = window.location.pathname.split('/')
        let id = aux[aux.length - 1]
        this.getUser(id)
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        if(this.state.firstName && this.state.lastName && this.state.password && this.state.birthday) {
            axios.put('/users' + window.location.pathname, 
            { firstName: this.state.firstName, 
            lastName: this.state.lastName,
            password: this.state.password,
            birthday: new Date(this.state.birthday)}).then(() => {
                alert("User succesfully updated!");
                history.push('/users');
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert("Please complete all the fields!");
        }
    }

    render() {
        return  <div>
                    <p><input name='firstName' type='text' value = {this.state.firstName} onChange={this.onChange} /></p>
                    <p><input name='lastName' type='text' value = {this.state.lastName} onChange={this.onChange}   /></p>
                    <p><input name='password' type='text' value = {this.state.password} onChange={this.onChange}   /></p>
                    <p><input name='birthday' type='date' value = {this.state.birthday} onChange={this.onChange}  /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}
export default UpdateUser