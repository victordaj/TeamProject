import React from 'react';
import ReactDOM from 'react-dom';


class CreateUser extends React.Component {
    state = {
        firstName : '',
        lastName : '',
        password : '',
        email: '',
        birthday : ''
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        this.props.onCreate({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            password : this.state.password,
            email: this.state.email,
            birthday : new Date(this.state.birthday)
        })
    }

    render() {
        return  <div>
                    <p><input name  ='firstName' type='text' onChange={this.onChange} value={this.state.firstName} placeholder='Please enter your firstname' /></p>
                    <p><input name='lastName' type='text' onChange={this.onChange} value={this.state.lastName} placeholder='Please enter your lastname' /></p>
                    <p><input name='email' type='text' onChange={this.onChange} value={this.state.email} placeholder='Please enter your email address' /></p>
                    <p><input name='password' type='password' onChange={this.onChange} value={this.state.password} placeholder="Enter a password" /></p>
                    <p><input name='birthday' type='date' onChange={this.onChange} value={this.state.date} placeholder='Enter your birthday date' /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}
export default CreateUser