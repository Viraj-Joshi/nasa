import React, {Component} from 'react';
import './styles/search.css'
import M from "materialize-css";
class Search extends Component{
    componentDidMount(){
        M.AutoInit();
      }

    render(){
        return(
            <div className=" container search_box ">
                
                <div class="card blue-grey darken-1">
                    
                    <div class="card-content">
                        <div className = "row">
                            <form className = "search">
                                <div className = "input-field col s10  ">
                                    <input id = "input_search" type="text" className = "validate"/>
                                    <label for="input_search">Search the NASA Gallery!</label>
                                </div>    
                                <div className = "submit">
                                    <a class="waves-effect waves-light btn-small"><i class="material-icons right">search</i>Submit</a>
                                </div>
                            </form>
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
                                        <li><a href="#!"><i class="material-icons">Mars Rover</i>four</a></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>        
                    
                            

            </div>
        );
    }
}
export default Search;