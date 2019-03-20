import React, {Component} from 'react';
import './styles/search.css'
import M from "materialize-css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class Search extends Component{
    constructor(props){
        super(props);
    }
    
   
    componentDidMount(){
        M.AutoInit();
    }
    render(){
        return(
            <div className=" container search_box ">
                
                <div className="card blue-grey darken-1">
                <form className = "row" onSubmit={this.props.handleSubmit}>
                    <div className="card-content">
                        <div className = "row">
                            
                                <div className = "input-field col s10  ">   
                                    <input name = "search" 
                                           id = "input_search"
                                           type="text" 
                                           className = "validate" 
                                           value={this.props.formValues["search"]} 
                                           onChange={this.props.handleInputChange}/>
                                    <label for="input_search">Search the NASA Gallery!</label>
                                </div>    
                                <button className="btn waves-effect waves-light" type="submit">Submit
                                    <i className="material-icons right">search</i>
                                </button>
                            
                        </div>
                        <div className = "row">

                            <div className = "col s4 input-field">
                                <input name = "date"
                                 type="text" 
                                 placeholder = "Date" 
                                 className="datepicker"
                                 value={this.props.formValues["date"]} 
                                 onSelect = {this.props.handleInputChange}
                                 format = "mm dd, yyyy"
                                 />
                            </div>
                            
                            {/* <DatePicker
                             className = "col s4"
                             selected={this.props.formValues["date"]}
                             onChange={this.props.handleDateChange}
                            /> */}
                            
                        </div>
                    </div>
                    <div className="card-action">
                        <div className = "row">
                                <div className = "col s12 search_description ">
                                    <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Pick a Category</a>

                                    <ul id='dropdown1' className='dropdown-content'>
                                        <li><a href="#!"> Earth Polychromatic Imaging Camera</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li><a href="#!">Landsat 8 Image</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li><a href="#!">Image & Video Library</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li><a href="#!">Mars Rover</a></li>
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