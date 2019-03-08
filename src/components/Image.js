import React, { Component } from 'react';
import M from "materialize-css";
class Image extends Component {
    componentDidMount(){
        M.AutoInit();
    }
    render() {
       return (
        <div>
            <div className="input-field col s12">
            <select>
            
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <label>Materialize Select</label>
            </div>
        </div>
       );
    }
 }
export default Image;
 
