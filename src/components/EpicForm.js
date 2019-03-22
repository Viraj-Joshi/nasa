// now we are free to use the state of the parent component as a prop to generate the images


import React, {Component} from 'react';
import M from "materialize-css";
class EpicForm extends Component{
    componentDidMount(){
        M.AutoInit();
    }
    render(){
        const EPIC_metadata = 'https://epic.gsfc.nasa.gov/archive/natural';
        let EPIC;
        // if (this.props.formValues["selectedCategory"] === '1'){
            var IMAGE_FIELD = {
                src: "",
                thumbnail: "",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
                isSelected: false, 
                caption: ""   
            }
            var d1 = this.props.dates["startDate"].toString();
            console.log(d1);
            var d2 = this.props.dates["endDate"].toString();
            
            const isSameDate = d1 === d2;
            if(d1 !== ""){
            const year = d1.substring(d1.length-4);
            const month = d1.substring(d1.length-1);

            console.log(year);  
            }
            if(isSameDate){
                // fetch(EPIC_metadata + '/')
            }
        // }
            
        
        return(
        //    {EPIC}
        <div></div>
        );
    }
}
export default EpicForm;