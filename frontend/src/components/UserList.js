import React from 'react';
import ReactDOM from 'react-dom';

class UserList  extends React.Component {

    formatDate = birthday => {
        let formatted_date = birthday.getDate() + '/' + (birthday.getMonth()+1) + '/' + birthday.getFullYear();
        return formatted_date;
    }

    render() { 
        return (<div>
            <h1>
                Users: 
            </h1>
            <ul>
                {this.props.list.length > 0 ? this.props.list.map(user =>
                    <li>
                        First Name: {user.firstName}
                        <br/>
                        Last Name: {user.lastName}
                        <br/>
                        Birthday: {this.formatDate(new Date(user.birthday))}
                        <br/>
                        isActive: {user.isActive.toString()}
                        <br/>
                        Password: {user.password}
                        <button onClick={() => this.props.onDelete(user._id)}> Delete </button>
                        <button onClick={() => this.props.onUpdate(user._id)}> Update </button>
                    </li>) :
                    'No tasks found in list'}
            </ul>
        </div>);
    }
}
export default UserList