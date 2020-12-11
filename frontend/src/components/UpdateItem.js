import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../utils/axios'
import history from '../utils/history';

class UpdateItem extends React.Component {
    state = {
        name: '',
        description: ''
    }

    getUID = () => {
        let uid = this.props.match.params.id
        return uid;
    }

    getIID = () => {
        let iid = this.props.match.params.item_id
        return iid
    }

    getItem = () => {
        axios.get('/users/' + this.getUID() + '/items/' + this.getIID()).then(response => {
          this.setState({ ...response.data })
        }).catch(err => {
          console.log('eroare');
        })
      }

    componentDidMount() {
        this.getItem(this.getIID())
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        if(this.state.name && this.state.description) {
            axios.put('/users/' + this.getUID() + '/items/' + this.getIID(), 
            { name: this.state.name, 
              description: this.state.description }).then(() => {
                  alert("Item succesfully updated");
                  history.push('/users/' + this.getUID() + '/items')
              }).catch(err => {
                  console.log(err);
              })
        } else {
            alert("Please complete all the fields")
        }
    }

    render() {
        return  <div>
                    <p><input name='name' type='text' onChange={this.onChange} value={this.state.name}/></p>
                    <p><input name='description' type='text' onChange={this.onChange} value={this.state.description} /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}

export default UpdateItem