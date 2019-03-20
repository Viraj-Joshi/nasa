import React, {Component} from 'react';
import './styles/search.css'
import M from "materialize-css";
class Search extends Component{
    componentDidMount(){
        M.AutoInit();
    }
    render(){
    // we need to condtionally generate terms specific to selection of category 
        const formType = this.props.formValues['selectedCategory'];
        console.log(formType);
        let additionalForm;

        // nothing for form 1 
        if(formType==='2'){
            additionalForm = <div className = "input-field col s2  ">   
                                    <input name = "search1" 
                                        id = "input_search"
                                        type="text" 
                                        className = "validate" 
                                        // value={this.props.formValues["search"]} 
                                        // onChange={this.props.handleInputChange}
                                    />
                                    <label for="input_search">Search the NASA Gallery!</label>
                             </div>
        }
        
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
                            <div className = "col s3 input-field">
                                <i className = "material-icons prefix">calendar_today</i>
                                <input name = "date"
                                 type="text" 
                                 placeholder = "Start Date" 
                                 className="datepicker"
                                 value={this.props.formValues["start_date"]} 
                                 onSelect = {this.props.handleInputChange}
                                 format = "yyyy mm dd"
                                 />
                            </div>
                            <div className = "col s3 input-field">
                                <i className = "material-icons prefix">calendar_today</i>
                                <input name = "date"
                                 type="text" 
                                 placeholder = "End Date" 
                                 className="datepicker"
                                 value={this.props.formValues["end_date"]} 
                                 onSelect = {this.props.handleInputChange}
                                 format = "yyyy mm dd"
                                 />
                            </div>                                                        

                            <div col s1 ></div>
                            {additionalForm}
                            

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

                                        <li  value = "Image & Video Library" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="3" href="#!">Image & Video Library</a></li>
                                        <li className="divider" tabindex="-1"></li>

                                        <li  value = "Mars Rover" onClick = {this.props.handleInputChange}><a name = "selectedCategory" data-id="4" href="#!">Mars Rover</a></li>
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