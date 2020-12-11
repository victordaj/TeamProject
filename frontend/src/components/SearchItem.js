import React from 'react';

class SearchItem  extends React.Component {
    state = { 
        name : ''
    }
    onChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    submitForm = () =>{
        this.props.onSubmit(this.state.name)
    }
    render() { 
        return <div>
            <h2>Search Items</h2>
            <p><input name='name' type='text' onChange={this.onChange} value={this.state.name} placeholder='Search item by name or description' /></p>       
            <button onClick={this.submitForm}>Search</button>
        </div>
    }
}
 
export default SearchItem;