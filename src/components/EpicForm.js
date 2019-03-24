// now we are free to use the state of the parent component as a prop to generate the images


import React, {Component} from 'react';
import M from "materialize-css";

import Gallery from 'react-grid-gallery';

class EpicForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            IMAGES_METADATA: [],
            dateInfo1: {},
            dateInfo2: {}
            
        }
    }
    // resetState = () => {
    //     this.setState(this.getInitialState());
    //  }
    //  getInitialState = () => {
    //     const initialState = {
    //         IMAGES: [],
    //     };
    //     return initialState;
    // }
    componentDidMount(){
        M.AutoInit();
        const EPIC_metadata = 'https://epic.gsfc.nasa.gov/api/natural/';
       
        var monthArray = {
            Jan: '01',
            Feb: '02',
            Mar: '03',
            Apr: '04',
            May: '05',
            Jun: '06',
            Jul: '07',
            Aug: '08',
            Sep: '09',
            Oct: '10',
            Nov: '11',
            Dec: '12'
        }


        
        
        

        // we do not make api request for invalid form requests
        if(this.props.formValues["isValid"] && this.props.formValues["selectedCategory"] === '1'){
            var d1 = this.props.dates["startDate"].toString();
            console.log(d1);
            var d2 = this.props.dates["endDate"].toString();
            var dateInfo1 = undefined;
            var dateInfo2 = undefined;
            if(d1 !== "" && d2 === ""){
                dateInfo1 = parseDate(d1);
                console.log(dateInfo1);
            }else if(d1 === "" && d2 !== ""){
                dateInfo2 = parseDate(d2);
                console.log(dateInfo2);
                dateInfo1 = {
                    year: '2015',
                    month: '06',
                    day: '13'
                }
            }else if(d1 !== "" && d2 !== ""){
                dateInfo1 = parseDate(d1);
                dateInfo2 = parseDate(d2);
                console.log(dateInfo1);
                console.log(dateInfo2);
            }
            
            
            
                
            function parseDate(date){
                    var timePos = date.indexOf('12:00:00')
                    var year = date.substring(timePos-5,timePos-1);
                    //console.log(year);
                    var month = monthArray[date.substring(timePos - 12, timePos - 9)];
                    //console.log(month);
    
                    var day = date.substring(timePos - 8, timePos - 6);
                    //console.log(day);
    
                    return {
                        year: year,
                        month: month,
                        day: day
                    }   
            }
            fetch(EPIC_metadata + 'date/' + dateInfo1["year"] + "-"+dateInfo1["month"]+"-"+dateInfo1["day"] + "?api_key=" + process.env.REACT_APP_NASA_API_KEY)
                .then((resp) => resp.json())
                .then((data) => this.setState({IMAGES_METADATA: data}));
            this.setState({dateInfo1: dateInfo1});
            this.setState({dateInfo2: dateInfo2});
            console.log(this.state)

                
        }


        
    }
    
    render(){
            const EPIC_PHOTO = 'https://epic.gsfc.nasa.gov/archive/natural/';
       
    
            
            
    
            var IMAGES = [];
            
            
            //NASA's lat and long have too many sig figs after the decimal, so we truncate
            var lat = this.props.formValues["latitude"].toString();
            var long = this.props.formValues["longitude"].toString();
            var latDot = lat.indexOf(".");
            var longDot = long.indexOf(".");

            if(latDot !== -1){
                lat = lat.substring(0,latDot);
            }
            if(longDot !==-1){
                long = long.substring(0,longDot);
            }
            
            
            let dateInfo1 = this.state.dateInfo1;
            let dateInfo2 = this.state.dateInfo2;
            if(dateInfo1!==undefined && dateInfo2 === undefined){
                
                    
                    for (let i = 0; i < this.state.IMAGES_METADATA.length; i++) {
                        var curLat = this.state.IMAGES_METADATA[i].centroid_coordinates["lat"].toString();
                        var curLong = this.state.IMAGES_METADATA[i].centroid_coordinates["lon"].toString();
                        var full_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
                            +'/' + dateInfo1["day"] + '/jpg/' + this.state.IMAGES_METADATA[i].image + '.jpg';
                        var thumbs_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
                            +'/' + dateInfo1["day"] + '/thumbs/' + this.state.IMAGES_METADATA[i].image + '.jpg';
                        if((lat === "" && long ==="") || (curLat.substring(0,curLat.indexOf(".")) === lat && curLong.substring(0,curLong.indexOf(".")) === long)){
                            IMAGES.push({
                            // var IMAGE_FIELD = {
                                src: full_pic_url,
                                thumbnail: thumbs_pic_url,
                                thumbnailWidth: 100,
                                thumbnailHeight: 100,
                                isSelected: false, 
                                caption: this.state.IMAGES_METADATA[i].image + ": " + this.state.IMAGES_METADATA[i].caption + " at Latitude: " + this.state.IMAGES_METADATA[i].centroid_coordinates["lat"].toString() 
                                    + " and at Longitude: " + this.state.IMAGES_METADATA[i].centroid_coordinates["lon"].toString(),
                            // }
                            
                            });
                           
                           
                        }
                    
                    }
                    
                    
                }
                

        return(
            <div style={{
                display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}
            >
                <Gallery images = {IMAGES}/>
            </div>
        );
    }
}
export default EpicForm;