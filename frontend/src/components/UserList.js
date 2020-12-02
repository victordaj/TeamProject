import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = theme =>({
    table: {
      minWidth: 700,
    },
  });


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
            <TableContainer>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>FirstName</StyledTableCell>
                            <StyledTableCell align="right">LastName</StyledTableCell>
                            <StyledTableCell align="right">Password</StyledTableCell>
                            <StyledTableCell align="right">Birthday</StyledTableCell>
                            <StyledTableCell align="right">isActive</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                            <StyledTableCell align="right">Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.length > 0 ? this.props.list.map((user) =>
                            <StyledTableRow key = {user.firstName}>
                                <StyledTableCell component ="th" scope = "user">{user.firstName}</StyledTableCell>
                                <StyledTableCell align="right">{user.lastName}</StyledTableCell>
                                <StyledTableCell align="right">{user.password}</StyledTableCell>
                                <StyledTableCell align="right">{this.formatDate(new Date(user.birthday))}</StyledTableCell>
                                <StyledTableCell align="right">{user.isActive.toString()}</StyledTableCell>
                                <StyledTableCell align="right"><button onClick={() => this.props.onDelete(user._id)}> Delete </button></StyledTableCell>
                                <StyledTableCell align="right"><button onClick={() => this.props.onUpdate(user._id)}> Update </button></StyledTableCell>

                                
                                
                            </StyledTableRow>
                        ) : 'No users found'}
                    </TableBody>
                </Table>
             </TableContainer>
        </div>); 
    }
}
export default UserList