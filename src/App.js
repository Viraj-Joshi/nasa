import React, { Component } from 'react';
import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';

class App extends Component {

  
  render() {
    return (
      <div className="App">
        {/* <Image/>   */}
        <Search/>
      </div>
      
    );
  }
}

export default App;
