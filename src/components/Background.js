import React, { Component } from 'react';
// import { render } from 'react-dom';
import M from "materialize-css";
import Gallery from 'react-grid-gallery'
import './styles/background.css'

var IMAGES = [];
var IMAGE_SUBFIELD = {
    src: "",
    thumbnail: "",
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    isSelected: false, 
    caption: ""
}
class Background extends Component {

    componentDidMount(){
        M.AutoInit();

        //set the state to pics fetched from API call
        const url = "https://api.nasa.gov/planetary/apod?api_key=tRq8s3rpWZ5qllSvlbv7xue5f9teKfxVF4swV2x1"
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data){
            for (var key in data) {
                if(key === 'url'){
                    IMAGE_SUBFIELD.src = data[key];
                    IMAGE_SUBFIELD.thumbnail = data[key];
                }
                if(key === 'title'){
                    IMAGE_SUBFIELD.caption = data[key];
                }
                IMAGES.push(IMAGE_SUBFIELD);
            }
        })
        console.log(IMAGES);
    }
    
    render() {
       return (
           <div className = "background">
                <Gallery images={IMAGES}/>]
           </div>
       );
    }
 }
 
export default Background;