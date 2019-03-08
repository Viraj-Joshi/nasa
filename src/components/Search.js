import React, {Component} from 'react';
import M from "materialize-css";
class Search extends Component{
    componentDidMount(){
        M.AutoInit();
      }

    render(){
        return(
            <div className="row">
                <form className = "search container">
                    <div className = "input-field col s12">
                        <i class="tiny material-icons prefix">search</i>
                        <input id = "input_search" type="text" className = "validate"/>
                        <label for="input_search">Explore!</label>
                    </div>

                    <div className = "filterDropDown">
                        
                    </div>
                </form>
            </div>
        );
    }
}
export default Search;