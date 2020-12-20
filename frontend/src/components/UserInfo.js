import React from 'react';

class UserInfo extends React.Component {
    formatDate = birthday => {
        let formatted_date = birthday.getDate() + '/' + (birthday.getMonth()+1) + '/' + birthday.getFullYear();
        return formatted_date;
    }
    render() { 
        return (
            <div>
                <p>{this.props.user.firstName}</p>
                <p>{this.props.user.lastName}</p>
                <p>{this.formatDate(new Date(this.props.user.birthday))}</p>
            </div>  
            
            
        );
    }
}
 
export default UserInfo;