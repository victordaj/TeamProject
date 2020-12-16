import React from 'react';
import axios from '../utils/axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

class ItemList extends React.Component {
    render() {
        return <div>
                <h1>Items list: </h1>
                <TableContainer>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.list.length > 0 ? this.props.list.map((item) =>
                            <TableRow key = {item._id}>
                                <TableCell component ="th" scope = "item">{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell><button onClick={() => this.props.onUpdate(item._id)}>Update</button></TableCell>
                                <TableCell><button onClick={() => this.props.onDelete(item._id)}>Delete</button></TableCell>
                            </TableRow>
                        ) : 'No items found'}
                    </TableBody>
                </Table>
             </TableContainer>
             <TablePagination 
                rowsPerPageOptions = {[5, 10, 25]}
                component="div"
                count={this.props.count}
                rowsPerPage={this.props.rowsPerPage}
                page={parseInt(this.props.page)}
                onChangePage={this.props.action}
                onChangeRowsPerPage={this.props.action1}
            />
        </div>
    }
}
 
export default ItemList;