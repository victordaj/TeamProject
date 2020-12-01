import UserContainer from "./components/UserContainer";
import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  render() {
     return (
       <div className="App">
           <UserContainer  />
       </div>
    )
  }
}
export default App;