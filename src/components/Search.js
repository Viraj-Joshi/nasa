import React, {Component} from 'react';
import './styles/search.css'
import M from "materialize-css";
class Search extends Component{
    constructor(){
        super();
        this.state = {
            search: ' ',
            date: ' '
        }
    }
    componentDidMount(){
        M.AutoInit();
    }
    render(){
        return(
            <div className=" container search_box ">
                
                <div class="card blue-grey darken-1">
                <form className = "row search" onSubmit={this.handleSubmit}>
                    <div class="card-content">
                        <div className = "row">
                            
                                <div className = "input-field col s10  ">   
                                    <input name = "search" id = "input_search" type="text" className = "validate" value={this.state.search}  onChange={(e)=>{this.setState({search: e.target.value})}}/>
                                    <label for="input_search">Search the NASA Gallery!</label>
                                </div>    
                                <div className = "submit">
                                    <a class="waves-effect waves-light btn-small"><i class="material-icons right">search</i>Submit</a>
                                </div>
                            
                                </div>
                        <div className = "row">
                            <div className = "col s4 input-field">
                                <input type="text" placeholder = "Date" class="datepicker"/>
                            </div>
                            
                        </div>
                    </div>
                    <div class="card-action">
                        <div className = "row">
                                <div className = "col s12 search_description ">
                                    <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Pick a Category</a>

                                    <ul id='dropdown1' class='dropdown-content'>
                                        <li><a href="#!"> Earth Polychromatic Imaging Camera</a></li>
                                        <li class="divider" tabindex="-1"></li>

                                        <li><a href="#!">Landsat 8 Image</a></li>
                                        <li class="divider" tabindex="-1"></li>

                                        <li><a href="#!">Image & Video Library</a></li>
                                        <li class="divider" tabindex="-1"></li>

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