import React, { Component } from 'react';
//import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';
import Background from './components/Background'
class App extends Component {

  
  render() {
    return (
      <div className="App">
        {/* <Background/>   */}
        <Search/>
      </div>
      
    );
  }
}

export default App;
