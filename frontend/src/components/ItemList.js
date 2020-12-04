import React from 'react';
import axios from '../utils/axios'

class ItemList extends React.Component {
    state = {
        items : []
    }

    getItems = id =>{
        axios.get('/users/' + id +'/items').then(response =>{
            console.log(response)
            this.setState({items : response.data})  
        }).catch(err =>[
            console.log(err)
        ])
    };

    componentDidMount() {
        let id = this.props.match.params.id;
        this.getItems(id);
    }




    render() { 
        return <div>
                <h1>Items list</h1>
                <ul>
                    {this.state.items.length > 0 ? this.state.items.map((item) =>
                    <li>
                        {item.name}
                    </li>
                    ) : 'This user has no items'}
                </ul>
        </div>
    }
}
 
export default ItemList;