import React from 'react';
import axios from '../utils/axios'
import history from '../utils/history';

class ResetPassword extends React.Component {
    state = {
        firstName :'',
        oldPassword : '',
        newPassword : '',
        newPasswordRepeat : ''
      }
    getUsers = () => {
        axios.get('/reset/').then(response => {
          this.setState({users:response.data })
        }).catch(err => {
          console.log('eroare');
        })
      }
    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
         })
    }
    componentDidMount() {
        this.getUsers();
    }
    submitForm = () => {
        console.log("State: ", this.state)
        if(this.state.firstName && this.state.oldPassword && this.state.newPassword && this.state.newPasswordRepeat){
            if(this.state.newPassword === this.state.newPasswordRepeat){
                axios.put('/reset/' + this.state.firstName,{password : this.state.newPassword}).then(()=>{
                    alert("Password succesfully reseted")
                    history.push('/login')
                }).catch(err => {
                    console.log(err);
                })
            }else{alert("Check new password")}
        }else{alert("Please complete all the fields") }
    }
    render() { 
        return (<div>
                    <p><input name='firstName' type='text' value = {this.state.firstName} onChange={this.onChange} placeholder="First Name" /></p>
                    <p><input name='oldPassword' type='text' value = {this.state.lastName} onChange={this.onChange} placeholder="Old Password" /></p>
                    <p><input name='newPassword' type='text' value = {this.state.password} onChange={this.onChange} placeholder="New Password"  /></p>
                    <p><input name='newPasswordRepeat' type='text' value = {this.state.newPasswordRepeat} onChange={this.onChange} placeholder="New Password Repeat" /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
        </div>  )
    }
}
 
export default ResetPassword;