import React from 'react';
import axios from '../utils/axios'
import history from '../utils/history';

class ResetPassword extends React.Component {
    state = {
        users : [],
        firstName :'',
        oldPassword : '',
        newPassword : '',
        newPasswordRepeat : ''
      }
    getUsers = () => {
        axios.get('/users/').then(response => {
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
        console.log(this.state)
        if(this.state.firstName && this.state.oldPassword && this.state.newPassword && this.state.newPasswordRepeat){
            this.state.users.forEach(element => {
                if(element.firstName === this.state.firstName){
                    console.log(element.password)
                    console.log(this.state.oldPassword)
                    if(element.password === this.state.oldPassword){
                        if(this.state.newPassword === this.state.newPasswordRepeat){
                            axios.put('/users/users/' + element._id,{password : this.state.newPassword}).then(()=>{
                                alert("Password succesfully reseted")
                                history.push('/login')
                            }).catch(err => {
                                console.log(err);
                            })
                        }else{alert("Check new password")}
                    }else{alert("Wrong password")}
                }else{ alert("The user does not exist"); }
            })
        }else{alert("Please complete all the fields") }
    }
    render() { 
        return (<div>
                    <p><input name='firstName' type='text' value = {this.state.firstName} onChange={this.onChange} placeholder="FirstName" /></p>
                    <p><input name='oldPassword' type='text' value = {this.state.lastName} onChange={this.onChange} placeholder="Old Password" /></p>
                    <p><input name='newPassword' type='text' value = {this.state.password} onChange={this.onChange} placeholder="New Password"  /></p>
                    <p><input name='newPasswordRepeat' type='text' value = {this.state.newPasswordRepeat} onChange={this.onChange} placeholder="New Password Repeat" /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
        </div>  )
    }
}
 
export default ResetPassword;