import React, { Component } from 'react';
//import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';
import EpicForm from './components/EpicForm'
// import Background from './components/Background'

class App extends Component {
 
  constructor(props){
    super(props);
    // we hold the state in the parent compnent so we can pass it as a prop
    this.state = {
      formValues:{
          search: '',
          start_date: new Date().toDateString(),
          end_date : new Date().toDateString(),
          selectedCategory: ""
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange = (event) =>{
    //let OPTIONS = ["Earth Polychromatic Imaging Camera", "Landsat 8 Image","Image & Video Library", "Mars Rover"];
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;
    formValues[name] = value;

    if(event.target.dataset.id > 0){
      //formValues[name] = OPTIONS[event.target.dataset.id - 1];
      formValues[name] = event.target.dataset.id;
    }
    this.setState({formValues});
  }
  

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
        />

      <EpicForm 
        formValues = {this.state.formValues}
      />

        



      </div>
      
    );
  }
}

export default App;
