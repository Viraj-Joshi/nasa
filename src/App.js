import React, { Component } from 'react';
//import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';
import Background from './components/Background'
class App extends Component {
  constructor(props){
    super(props);
    // we hold the state in the parent compnent so we can pass it as a prop
    this.state = {
      formValues:{
          search: '',
          date: new Date(2019,2).toDateString()
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = (event) =>{
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;
    formValues[name] = value;

    this.setState({formValues});
  }
  // handleDateChange = (date) =>{
  //   console.log(date);
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.formValues);
  } 
  
  render() {
    return (
      <div className="App">
        {/* <Background/>   */}
        <Search
          formValues = {this.state.formValues}
          handleInputChange = {this.handleInputChange}
          handleSubmit = {this.handleSubmit}
          // handleDateChange = {this.handleDateChange}
        />
      </div>
      
    );
  }
}

export default App;
