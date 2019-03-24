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
          longitude: "",
          isValid:false,
          // IMAGES: [],
      },
      dates:{
        startDate: "",
        endDate: ""
      },
    };
   
  }
  
  handleInputChange = (event) =>{
    //let OPTIONS = ["Earth Polychromatic Imaging Camera", "Landsat 8 Image","Image & Video Library", "Mars Rover"];
    event.preventDefault();
    let formValues = this.state.formValues;
    let name = event.target.name;
    let value = event.target.value;
    //console.log(name + ": "  + value);
    formValues[name] = value;

    if(event.target.dataset.id > 0){
      // console.log('here');
      //formValues[name] = OPTIONS[event.target.dataset.id - 1];
      formValues[name] = event.target.dataset.id;
    }
    this.setState({formValues});
  }

  //have physically given up trying to make Materialize Datepicker work....i.e one extra handler and another library
  handleStartDateChange(day){
    let dates = this.state.dates;
    dates["startDate"] =  day;
    this.setState({dates});
    console.log(this.state.dates["startDate"])
  }
  handleEndDateChange(day){
    let dates = this.state.dates;
    dates["endDate"] = day;
    this.setState({dates});
  }
  
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    
    if(this.state.dates["startDate"]!=="" && this.state.dates["endDate"]!=="" &&
        (this.state.dates["endDate"] < this.state.dates["startDate"] || this.state.dates["startDate"] > this.state.dates["endDate"])){
      let formValues = this.state.formValues;
      formValues["isValid"] = false
      this.setState({formValues})
      alert("Please enter a chronological date order");
    }else if(this.state.dates["startDate"] === undefined || this.state.dates["endDate"] === undefined){
      alert("Please select a date rather than type a date");
      let formValues = this.state.formValues;
      formValues["isValid"] = false
      this.setState({formValues})
    }else{
        let formValues = this.state.formValues;
        formValues["isValid"] = true;
        this.setState({formValues});
    }
    if(this.state.formValues["selectedCategory"]==='1' && this.state.formValues["isValid"]){
      //regex blatantly stolen from Stack Overflow
      var regex_lat= /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
      var regex_long = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
      var lat = this.state.formValues["latitude"];
      var long = this.state.formValues["longitude"];

      if(!lat.match(regex_lat) && (lat !== "")){
        let formValues = this.state.formValues;
        formValues["isValid"] = false;
        this.setState({formValues});
        alert("improper latitude format");
      }else if(!long.match(regex_long) && (long !== "")){
        let formValues = this.state.formValues;
        formValues["isValid"] = false;
        this.setState({formValues});
        alert("improper longitude format");
      }else if((lat === "" && long !=="") || (lat !== "" && long ==="") ){
        let formValues = this.state.formValues;
        formValues["isValid"] = false;
        this.setState({formValues});
        alert("Must enter both latitude and longitude");
      }else if((long === "" && lat === "") || (lat.match(regex_lat) && long.match(regex_long))){
        let formValues = this.state.formValues;
        formValues["isValid"] = true;
        this.setState({formValues});
    }
    // let formValues = this.state.formValues;
    // formValues["IMAGES"] = [];
    // this.setState({formValues});
    
    console.log(this.state.formValues);

    }
  } 
  
  render() {

    let formType;
    if(this.state.formValues["selectedCategory"] === '1' && this.state.formValues["isValid"]){
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
      <div className = "container row">
        {formType}
      </div>
      
        



      </div>
      
    );
  }
}

export default App;
