/*
 * We set up the search input, the filters, and the conditional logic for adding additional inputs 
 * for certan categories
*/

import React, {Component} from 'react';
import './styles/search.css'
import M from "materialize-css";


// import Helmet from 'react-helmet';
// import DayPicker, { DateUtils } from 'react-day-picker';


import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';

import 'moment/locale/es-us';




class Search extends Component{
    componentDidMount(){
        M.AutoInit();
    }
    render(){
    // we need to condtionally generate inputs specific to selection of the EPIC category 
        
        const formType = this.props.formValues['selectedCategory'];
        console.log(formType);
        let additionalForm,additionalForm1,isDisabled;

       if(formType === '1'){
        isDisabled =    <div class="input-field col s10">
                            <input disabled value="Disabled for this category" id="disabled" type="text" class="validate"/>
                            {/* <label for="disabled">Disabled</label> */}
                        </div>
        additionalForm = <div className = "input-field col s2  ">   
                                <input name = "latitude" 
                                    id = "input_lat"
                                    type="text"
                                    // className = "validate" 
                                    // value={this.props.formValues["latitude"]} 
                                    onChange={this.props.handleInputChange}
                                />
                                <label for="input_lat">Latitude</label>
                            </div>
        
        additionalForm1 = <div className = "input-field col s2  ">   
                            <input name = "longitude"
                                id = "input_long" 
                                type="text"
                                // className = "validate" 
                                // value={this.props.formValues["longitude"]} 
                                onChange={this.props.handleInputChange}
                            />
                            <label for="input_long">Longitude</label>
                            </div>
       }
       else if(formType==='2'){
        isDisabled =    <div class="input-field col s10">
                            <input disabled value="Disabled for this category" id="disabled" type="text" class="validate"/>
                            {/* <label for="disabled">Disabled</label> */}
                        </div>
        additionalForm = <div className = "input-field col s2  ">   
                            <input name = "latitude" 
                                id = "input_lat"
                                type="text"
                                // className = "validate" 
                                // value={this.props.formValues["latitude"]} 
                                onChange={this.props.handleInputChange}
                            />
                            <label for="input_lat">Latitude</label>
                        </div>

        additionalForm1 = <div className = "input-field col s2  ">   
                                <input name = "longitude"
                                    id = "input_long" 
                                    type="text"
                                    // className = "validate" 
                                    // value={this.props.formValues["longitude"]} 
                                    onChange={this.props.handleInputChange}
                                />
                                <label for="input_long">Longitude</label>
                            </div>
       }else if(formType==='3'){
            isDisabled =    <div className = "input-field col s10  ">   
                                <input name = "search" 
                                    id = "input_search"
                                    type="text" 
                                    className = "validate" 
                                    value={this.props.formValues["search"]} 
                                    onChange={this.props.handleInputChange}/>
                                <label for="input_search">Search the NASA Gallery!</label>
                            </div>   
        }
        return(
            <div className=" container search_box ">
                
                <div className="hoverable card blue-grey darken-1">
                <form className = "row" onSubmit={this.props.handleSubmit}>
                    <div className="card-content">
                        <div className = "row">
                            
                                {isDisabled}  
                                <button className="btn waves-effect waves-light" type="submit">Submit
                                    <i className="material-icons right">search</i>
                                </button>
                            
                        </div>
                        <div className = "row">
                            {/* <div className = "col s6 input-field">
                                <i className = "material-icons prefix">calendar_today</i>
                                <input name = "start_date"
                                 type="text" 
                                 placeholder = "Start Date" 
                                 className="datepicker"
                                 value={this.props.formValues["start_date"]} 
                                
                                 
                                 />
                            </div>   */}
                            {/* <div className = "col s6 input-field">
                                <i className = " material-icons prefix tiny">calendar_today</i>
                                <input name = "end_date"
                                 type="text" 
                                 placeholder = "End Date" 
                                 className="datepicker"
                                 value={this.props.formValues["end_date"]} 
                                 onSelect = {this.props.handleInputChange}
                                 // format = "yyyy mm dd"
                                 />
                            </div>                                                         */}
                            <div className = "col s6">
                            
                                <DayPickerInput name = "startDate" format="M/D/YYYY" formatDate={formatDate}
                                    parseDate={parseDate}
                                    placeholder={`${formatDate(new Date(),'MM-DD-YYYY')}`} onDayChange={this.props.handleStartDateChange} />
                            </div>
                            <div className = "col s6">
                            
                                <DayPickerInput name = "endDate" format="M/D/YYYY" formatDate={formatDate}
                                    parseDate={parseDate}
                                    placeholder={`${formatDate(new Date(),'MM-DD-YYYY')}`} onDayChange={this.props.handleEndDateChange} />
                            </div>
                            
                        </div>
                        <div className = "row">
                            {additionalForm}
                            {additionalForm1}
                        </div>
                    </div>
                    <div className="card-action">
                        <div className = "row">
                                <div className = "col s12 search_description ">
                                    {/* Dropdown Trigger */}
                                    <a className='dropdown-trigger btn' data-target='dropdown1'>Pick a Category</a>

                                    {/* Dropdown Structure */}
                                    <ul id='dropdown1' className='dropdown-content' >
                                        <li value = "EPIC" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="1" href="#!"> Earth Polychromatic Imaging Camera</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li  value = "Landsat 8 Image" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="2" href="#!">Landsat 8 Image</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li  value = "Nasa Image & Video Library" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="3" href="#!">Nasa Image & Video Library</a></li>
                                        {/* <li className="divider" tabindex="-1"></li> */}

                                        {/* <li  value = "Mars Rover" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="4" href="#!">Mars Rover</a></li> */}
                                        

                                        
                                    </ul>
                                </div>
                        </div>
                    </div>

                </form>      
                </div>
                            

            </div>
        );
    }
}
export default Search;