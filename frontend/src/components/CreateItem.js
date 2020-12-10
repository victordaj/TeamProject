import React from 'react';
import ReactDOM from 'react-dom';


class CreateItem extends React.Component {
    state = {
        name: '',
        description: '',
        userID: ''
    }

    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = () => {
        this.props.onCreate({
            name: this.state.name,
            description: this.state.description,
            userID: this.props.id
        })
    }

    render() {
        return  <div>
                    <h2>Create Items</h2>
                    <p><input name='name' type='text' onChange={this.onChange} value={this.state.name} placeholder='Please enter item name' /></p>
                    <p><input name='description' type='text' onChange={this.onChange} value={this.state.description} placeholder='Please enter item description' /></p>
                    
                    <button onClick={this.submitForm}>Submit</button>
                </div>
    }
}

export default CreateItem