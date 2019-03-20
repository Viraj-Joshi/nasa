import React, {Component} from 'react';

import M from "materialize-css";
class EpicForm extends Component{
    componentDidMount(){
        M.AutoInit();
    }
    render(){
        const IMAGE_FIELD 
        const startDate = this.props.formValues['start_date'];
        const endDate = this.props.formValues['end_date'];

        const isSame = startDate === endDate;
        return(
           if(isSame){

           }
        );
    }
}
export default EpicForm;