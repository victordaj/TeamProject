import CreateItem from './CreateItem';
import ItemList from './ItemList';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios';
import history from '../utils/history';
import SearchItem from './SearchItem';

const divStyle = {
  display: 'flex',
  justifyContent: 'space-between'
}

class ItemContainer extends React.Component {

  state = {
    items: [],
    allItems : [],
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
  //get all items
  getAllItems = (id) => {
    axios.get('/users/' + id + '/items/').then(response => {
      this.setState({ allItems: response.data})
    }).catch(err => {
      this.error(err)
    })
  }
  //get items regarding pagination
  getItems = (id,page,rowsPerPage) => {
    axios.get('/users/' + id + '/items/'+ page +'/' + rowsPerPage).then(response => {
      this.setState({ items: response.data})
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
    this.setState({allItems : this.state.items})
  } 

  componentDidMount() {
    this.getAllItems(this.getUID());
    this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
  }

  handleChangePage = (event,page) => {
    this.setState({ page : page }, () => {
      let aux = this.state.page > 0 ? (this.state.rowsPerPage*page) : this.state.ItemRows;
      console.log(this.state.page)
      this.getItems(this.getUID(),aux,this.state.rowsPerPage);
    })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value},() =>{
      console.log(this.state.rowsPerPage)
      this.getItems(this.getUID(),this.state.page,this.state.rowsPerPage);
    })
  };

  render() {
    console.log(this.state.page);
    return (
      <div>
        <div style={divStyle}>
          <CreateItem  onCreate={this.createItem} />
          <SearchItem onSubmit={this.submitSearch}/>
        </div>
        <ItemList list={this.state.items}
                  all_List={this.state.allItems}  
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
