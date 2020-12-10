import CreateItem from './CreateItem';
import ItemList from './ItemList';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios';
import history from '../utils/history';
import SearchItem from './SearchItem';

class ItemContainer extends React.Component {

  state = {
    items: []
  }

  getUID = () => {
      let id = this.props.match.params.id;
      return id;
  }

  error = err => {
    console.log(err);
    alert("Error");
  }

  getItems = id => {
    axios.get('/users/' + id + '/items').then(response => {
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
        this.getItems(this.getUID());
      }).catch(err => {
        this.error(err);
      })
    }
  }

  createItem = item => {
    if(item.name && item.description) {
      axios.post('/users/' + this.getUID() + '/items', item).then(() => {
        this.getItems(this.getUID());
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
  } 

  componentDidMount() {
    this.getItems(this.getUID());
  }

  render() {
    return (
      <div >
        <CreateItem  onCreate={this.createItem} />
        <ItemList list={this.state.items} onDelete={this.deleteItem} onUpdate={this.updateItem}/>
        <SearchItem onSubmit={this.submitSearch}/>
      </div>
    )
  }
}

export default ItemContainer;
