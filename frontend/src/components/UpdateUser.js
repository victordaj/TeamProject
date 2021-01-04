import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios'
import history from '../utils/history';



class UpdateUser extends React.Component {
    state = {
        firstName : '',
        lastName : '',
        password : '',
        birthday : '',
        email: '',
        formattedDate: ''
    }

    getUser = userId => {
        axios.get('/users/' + userId).then(response => {
          this.setState({ ...response.data })
          this.formatDate(new Date(this.state.birthday))
        }).catch(err => {
          console.log('eroare');
        })
      }

    componentDidMount() {
        let userID = this.props.match.params.id;
        console.log(userID);
        this.getUser(userID);
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    formatDate = birthday => {
        let date = birthday.toISOString().substr(0, 10);
        this.setState({ formattedDate: date })
    }

    submitForm = () => {
        if(this.state.firstName && this.state.lastName && this.state.password && this.state.birthday) {
            axios.put('/users/' + this.props.match.params.id, 
            { firstName: this.state.firstName, 
            lastName: this.state.lastName,
            password: this.state.password,
            email: this.state.email,
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
                    <p><input name='email' type='text' value={this.state.email} onChange={this.onChange} /></p>
                    <p><input name='password' type='text' placeholder='New password' onChange={this.onChange}   /></p>
                    <p><input name='birthday' type='date' defaultValue = {this.state.formattedDate} onChange={this.onChange}  /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}
export default UpdateUser