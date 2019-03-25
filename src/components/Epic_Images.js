import React, {Component} from 'react';
import M from "materialize-css";

import Gallery from 'react-grid-gallery';
class Epic_Images extends Component{
    constructor(props){
        super(props);
        this.state = {
            images : this.props.images
        }
    }
    componentDidMount(){
        this.setState({images:this.props.images})
    }
    componentWillReceiveProps(nextProps){
        console.log(this.props.images)
        if(nextProps.refresh !== this.props.refresh){
            this.setState({images:this.props.images})
        }
    }
    render(){
        console.log(this.state.images)
        var w = window.nnerWidth;
        var h = window.innerHeight;

        window.resizeTo(w-1,h);
        window.resizeTo(w+1,h);
        return(
            <Gallery images = {this.state.images} />
        );
    }
}
export default Epic_Images;