import CreateItem from './CreateItem';
import ItemList from './ItemList';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios';
import history from '../utils/history';
import SearchItem from './SearchItem';
import UserContainer from './UserContainer';
import UserInfo from './UserInfo';

const divStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

class ItemContainer extends React.Component {

  state = {
    items: [],
    user : [],
    count : 0,
    page : 0,
    rowsPerPage : 5,
    ItemRows : 0
  }

  getUID = () => {
      let id = this.props.match.params.id;
      return id;
  }

  error = err => {
    console.log(err);
    alert("Error");
  }

  //get items regarding pagination
  getItems = (id,page,rowsPerPage) => {
    axios.get('/users/' + id + '/items/?page='+ page +'&rows=' + rowsPerPage).then(response => {
      console.log(response);
      this.setState({ items: response.data[1],count : response.data[0].length,user : response.data[2]})
    }).catch(err => {
      this.error(err)
    })
  }

  getSearchedItems = name => {
    axios.get('/users/' + this.getUID() + '/items/search/' + name ).then(response => {
      this.setState({ items: response.data})
    }).catch(err => {
      this.error(err)
    })
  }

  deleteItem = itemId => {
    if(window.confirm("Are you sure?")) {
      axios.delete('/users/' + this.getUID() + '/items/' + itemId).then(() => {
        this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
      }).catch(err => {
        this.error(err);
      })
    }
  }

  createItem = item => {
    if(item.name && item.description) {
      axios.post('/users/' + this.getUID() + '/items', item).then(() => {
        this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
      }).catch(err => {
        this.error(err);
      })
    } else alert("Please complete all the fields")
  }

  updateItem = itemId => {
    history.push('/users/' + this.getUID() + '/items/' + itemId);
  }

  submitSearch = name =>{
    this.getSearchedItems(name)
    this.setState({count : this.state.items.length})
  } 

  componentDidMount() {
    this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
  }

  handleChangePage = (event,page) => {
    this.setState({ page : page }, () => {
      let aux = this.state.page > 0 ? (this.state.rowsPerPage*page) : this.state.ItemRows;
      this.getItems(this.getUID(),aux,this.state.rowsPerPage);
    })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value},() =>{
      this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
    })
  };

  render() {
    return (
      <div>
        <div style={divStyle}>
          <CreateItem  onCreate={this.createItem} />
          <UserInfo user={this.state.user}></UserInfo>
          <SearchItem onSubmit={this.submitSearch}/>
        </div>
        <ItemList list={this.state.items}
                  count={this.state.count}  
                  page={this.state.page} 
                  rowsPerPage={this.state.rowsPerPage} 
                  onDelete={this.deleteItem} 
                  onUpdate={this.updateItem}
                  action ={this.handleChangePage}
                  action1 ={this.handleChangeRowsPerPage}
        />
      </div>
    )
  }
}

export default ItemContainer;
