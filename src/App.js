import React, { Component } from 'react';
//import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';
import EpicForm from './components/EpicForm'
// import Background from './components/Background'

class App extends Component {
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // we hold the state in the parent compnent so we can pass it as a prop
    this.state = {
      formValues:{
          search: '',
          selectedCategory: "",
          latitude: "",
          longititude: "",
      },
      dates:{
        startDate: "",
        endDate: ""
      }
    };
   
  }
  
  handleInputChange = (event) =>{
    //let OPTIONS = ["Earth Polychromatic Imaging Camera", "Landsat 8 Image","Image & Video Library", "Mars Rover"];
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;
    console.log(name + ": "  + value);
    formValues[name] = value;

    if(event.target.dataset.id > 0){
      // console.log('here');
      //formValues[name] = OPTIONS[event.target.dataset.id - 1];
      formValues[name] = event.target.dataset.id;
    }
    this.setState({formValues});
  }

  //have physically given up trying to make Materialize Datepicker work....i.e more handlers
  handleStartDateChange(day){
    let dates = this.state.dates;
    
    this.setState(dates["startDate"] =  day);
  }
  handleEndDateChange(day){
    let dates = this.state.dates;
    
    this.setState(dates["endDate"] = day);
  }
  
  
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.dates);
  } 
  
  render() {

    let formType;
    if(this.state.formValues["selectedCategory"] === '1'){
      formType =  <EpicForm 
                    formValues = {this.state.formValues}
                    dates = {this.state.dates}
                  />;
    }else{
      formType = <div></div>; 
    }
    return (
      <div className="App">
        {/* <Background/>   */}

        <Search
          formValues = {this.state.formValues}
          handleInputChange = {this.handleInputChange}
          handleStartDateChange = {this.handleStartDateChange}
          handleEndDateChange = {this.handleEndDateChange}
          handleSubmit = {this.handleSubmit}
        />
      
      {formType}
      
        



      </div>
      
    );
  }
}

export default App;
