import React, { Component } from 'react';
//import Image from './components/Image';
import 'materialize-css/dist/css/materialize.min.css';
import Search from './components/Search';
import EpicForm from './components/EpicForm'
import LandSatForm from './components/LandSatForm'

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
          pressed:false
      },
      dates:{
        startDate: "",
        endDate: ""
      },
      dateInfo1:{
        year: "",
        month: "",
        day: ""
      },
      dateInfo2:{
        year: "",
        month: "",
        day: ""
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

    formValues = this.state.formValues;
    formValues["pressed"] =  true;
    this.setState({formValues});
  }

  //have physically given up trying to make Materialize Datepicker work....i.e one extra handler and another library
  handleStartDateChange(day){
    let dates = this.state.dates;
    dates["startDate"] =  day;
    this.setState({dates});
    let formValues = this.state.formValues;
    formValues["pressed"] =  true;
    this.setState({formValues});
    console.log(this.state.formValues["pressed"])
    console.log(this.state.dates["startDate"])

    var monthArray = {
        Jan: '01',Feb: '02',Mar: '03',Apr: '04',May: '05',Jun: '06',Jul: '07',Aug: '08',Sep: '09', Oct: '10',Nov: '11',Dec: '12'
    }
    var d1 = this.state.dates["startDate"];
    let dateInfo1 = undefined;
    if(d1 !== ""){
      dateInfo1 = parseDate(d1.toString());
      console.log(dateInfo1)
    }
    function parseDate(date){
        var timePos = date.indexOf('12:00:00')
        var year = date.substring(timePos-5,timePos-1);
        //console.log(year);
        var month = monthArray[date.substring(timePos - 12, timePos - 9)];
        //console.log(month);

        var day = date.substring(timePos - 8, timePos - 6);
        //console.log(day);

        return{
            year: year,
            month: month,
            day: day                     
        }
    }
    let curDateInfo = this.state.dateInfo1;
    curDateInfo["year"] = dateInfo1["year"];
    curDateInfo["month"] = dateInfo1["month"];
    curDateInfo["day"] = dateInfo1["day"];
    this.setState({dateInfo1:curDateInfo});
    
    console.log(this.state)
  }
      
  handleEndDateChange(day){
    let dates = this.state.dates;
    dates["endDate"] = day;
    this.setState({dates});
    let formValues = this.state.formValues;
    formValues["pressed"] =  true;
    this.setState({formValues});
    var monthArray = {
      Jan: '01',Feb: '02',Mar: '03',Apr: '04',May: '05',Jun: '06',Jul: '07',Aug: '08',Sep: '09', Oct: '10',Nov: '11',Dec: '12'
    }
    var d2 = this.state.dates["endDate"];
    let dateInfo2 = undefined;
    
    function parseDate(date){
        var timePos = date.indexOf('12:00:00')
        var year = date.substring(timePos-5,timePos-1);
        //console.log(year);
        var month = monthArray[date.substring(timePos - 12, timePos - 9)];
        //console.log(month);

        var day = date.substring(timePos - 8, timePos - 6);
        //console.log(day);

        return {
            year: year,
            month: month,
            day: day
        }
    }   
    if(d2 !== ""){
      if(this.state.dates["startDate"] === ""){
        let curDateInfo = this.state.dateInfo1;
        curDateInfo["year"] = "2015";
        curDateInfo["month"] = "08";
        curDateInfo["day"] = "02";
        this.setState({dateInfo1:curDateInfo});  
      }
      dateInfo2 = parseDate(d2.toString());
      let curDateInfo = this.state.dateInfo2;
      curDateInfo["year"] = dateInfo2["year"];
      curDateInfo["month"] = dateInfo2["month"];
      curDateInfo["day"] = dateInfo2["day"];
      this.setState({dateInfo2:curDateInfo});  
    }
    console.log(this.state)
  }
  
  
  handleSubmit = (event) => {
    event.preventDefault();
    let formValues = this.state.formValues;
    formValues["pressed"] =  false;
    this.setState({formValues});

    if(this.state.dates["startDate"]!=="" && this.state.dates["endDate"]!=="" &&
        (this.state.dates["endDate"] < this.state.dates["startDate"] || this.state.dates["startDate"] > this.state.dates["endDate"])){
      let formValues = this.state.formValues;
      formValues["isValid"] = false
      this.setState({formValues})
      alert("Please enter a chronological date order");
    }
    else if(this.state.dates["startDate"] === undefined || this.state.dates["endDate"] === undefined){
      alert("Please select a date rather than type a date");
      let formValues = this.state.formValues;
      formValues["isValid"] = false
      this.setState({formValues})
    }
    else{
        let formValues = this.state.formValues;
        formValues["isValid"] = true;
        this.setState({formValues});
    }
    let cat = this.state.formValues["selectedCategory"];
    if((cat==='1' || cat==='2' || cat === '3') && this.state.formValues["isValid"]){
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
      }
      else if(!long.match(regex_long) && (long !== "")){
        let formValues = this.state.formValues;
        formValues["isValid"] = false;
        this.setState({formValues});
        alert("improper longitude format");
      }
      else if((lat === "" && long !=="") || (lat !== "" && long ==="") ){
        let formValues = this.state.formValues;
        formValues["isValid"] = false;
        this.setState({formValues});
        alert("Must enter both latitude and longitude");
      }
      else 
      {
        if((long === "" && lat === "") && (cat === '2')){
          let formValues = this.state.formValues;
          formValues["isValid"] = false;
          this.setState({formValues});
          alert("cannot submit for this category without a location")
        }
        if(((long === "" && lat === "") || (lat.match(regex_lat) && long.match(regex_long)))&& cat === '1' ||
            ((lat.match(regex_lat) && long.match(regex_long)) && cat === '2')){
          let formValues = this.state.formValues;
          formValues["isValid"] = true;
          this.setState({formValues});
          
          
      }
    }
    // let formValues = this.state.formValues;
    // formValues["IMAGES"] = [];
    // this.setState({formValues});
    
    console.log(this.state.formValues);
    console.log(this.state.dateInfo1)

    }
    
  } 
  
  render() {

    let formType;
    if(this.state.formValues["selectedCategory"] === '1' && this.state.formValues["isValid"]){
      formType =  <EpicForm 
                    formValues = {this.state.formValues}
                    dates = {this.state.dates}
                    dateInfo1 = {this.state.dateInfo1}
                    dateInfo2 = {this.state.dateInfo2}
                    // key={this.state.formValues["fullyRendered"]}
                  />;
    }else if(this.state.formValues["selectedCategory"] === '2' && this.state.formValues["isValid"]){
      formType = <LandSatForm 
                  formValues = {this.state.formValues}
                  dates = {this.state.dates}
                  dateInfo1 = {this.state.dateInfo1}
                  dateInfo2 = {this.state.dateInfo2}
                  
                  />;
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
