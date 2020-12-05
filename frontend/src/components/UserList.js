import React from 'react';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

  const useStyles = theme =>({
    table: {
      minWidth: 700,
    },
  });


class UserList  extends React.Component {hur
    formatDate = birthday => {
        let formatted_date = birthday.getDate() + '/' + (birthday.getMonth()+1) + '/' + birthday.getFullYear();
        return formatted_date;
    }

    render() { 
        return (<div>
            <h1>
                Users: 
            </h1>
            <TableContainer>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Birthday</TableCell>
                            <TableCell align="right">isActive</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Check Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.length > 0 ? this.props.list.map((user) =>
                            <TableRow key = {user.firstName}>
                                <TableCell component ="th" scope = "user">{user.firstName}</TableCell>
                                <TableCell align="right">{user.lastName}</TableCell>
                                <TableCell align="right">{user.password}</TableCell>
                                <TableCell align="right">{this.formatDate(new Date(user.birthday))}</TableCell>
                                <TableCell align="right">{user.isActive.toString()}</TableCell>
                                <TableCell align="right"><button onClick={() => this.props.onDelete(user._id)}> Delete </button></TableCell>
                                <TableCell align="right"><button onClick={() => this.props.onUpdate(user._id)}> Update </button></TableCell>
                                <TableCell align="right"><button onClick={() => this.props.onCheck(user._id)}> Check Items </button></TableCell>

                                
                                
                            </TableRow>
                        ) : 'No users found'}
                    </TableBody>
                </Table>
             </TableContainer>
        </div>); 
    }
}
export default UserList