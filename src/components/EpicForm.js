// now we are free to use the state of the parent component as a prop to generate the images


import React, {Component} from 'react';
import M from "materialize-css";


import Epic_Images from './Epic_Images';
class EpicForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            IMAGES_METADATA: [],
            isFullyRendered: false,
            isLoading : false,
            refreshImageList: false
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
        
        
        
        //we do not make api request for invalid form requests
        console.log(this.props.formValues["pressed"])
        if(!this.props.formValues["pressed"]  && this.props.formValues["isValid"] && this.props.formValues["selectedCategory"] === '1'){
            console.log('https://epic.gsfc.nasa.gov/api/natural/' + 'date/' + this.props.dateInfo1["year"] + "-"+this.props.dateInfo1["month"]+"-"+this.props.dateInfo1["day"] + "?api_key=" + process.env.REACT_APP_NASA_API_KEY)
            this.setState({isLoading: true})
            this.getData(this.props.dateInfo1["year"], this.props.dateInfo1["month"], this.props.dateInfo1["day"]);
        }
        

        
    }
    componentWillReceiveProps(nextProps){
        
        this.getData(this.props.dateInfo1["year"], this.props.dateInfo1["month"], this.props.dateInfo1["day"]);
        this.setState({isLoading:true})
        
    }
    
    
    getData = (year,month,day) => {
        const EPIC_metadata = 'https://epic.gsfc.nasa.gov/api/natural/';
        fetch(EPIC_metadata + 'date/' + year + "-"+month+"-"+day + "?api_key=" + process.env.REACT_APP_NASA_API_KEY)
        .then((resp) => resp.json())
        .then(data => {   
            this.setState({IMAGES_METADATA: data});
            this.setState({isLoading: false})
            this.refreshImageList();
        });
    }
    
    render(){
            const EPIC_PHOTO = 'https://epic.gsfc.nasa.gov/archive/natural/';                      
            var IMAGES = [];
            if(this.props.formValues["isValid"]){
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
                if (this.state.isLoading) {
                    return <div className = "container"><div className="col s12 progress">
                                <div className="indeterminate"></div>
                            </div></div>
                        
                }
                
                  let dateInfo1 = this.props.dateInfo1;
                  let dateInfo2 = this.props.dateInfo2;

                if(this.props.formValues["selectedCategory"] === '1'){
                    if(!this.props.formValues["pressed"] && this.props.dates["startDate"]!=="" && this.props.dates["endDate"] === ""){
                        IMAGES = []
                        for (let i = 0; i < this.state.IMAGES_METADATA.length; i++) {
                            
                            let curLat = this.state.IMAGES_METADATA[i].centroid_coordinates["lat"].toString();
                            let curLong = this.state.IMAGES_METADATA[i].centroid_coordinates["lon"].toString();
                            let full_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
                                +'/' + dateInfo1["day"] + '/jpg/' + this.state.IMAGES_METADATA[i].image + '.jpg';
                            let thumbs_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
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
                    
                            
                            
                    }else if(!this.state.refreshImageList && !this.props.formValues["pressed"] && this.props.dates["startDate"]!=="" && this.props.dates["endDate"] !== ""){
                        console.log("double")
                        var startDate = new Date(dateInfo1["year"],Number(parseInt(dateInfo1["month"])-1),dateInfo1["day"]);
                        var endDate = new Date(dateInfo1["year"],Number(parseInt(dateInfo2["month"])-1),dateInfo2["day"]);
                        // console.log(startDate);
                        // console.log(endDate)
                        let tomorrow = startDate;
                        IMAGES = []
                        var local_METADATA = []
                        while(Date.parse(tomorrow)<=Date.parse(endDate)){
                            let day = str_pad(tomorrow.getDate());
                            let month = str_pad(tomorrow.getMonth()+1);
                            let url = 'https://epic.gsfc.nasa.gov/api/natural/' + 'date/' + tomorrow.getFullYear() + "-"+month+"-"+day + "?api_key=" + process.env.REACT_APP_NASA_API_KEY;
                            fetch(url)
                            .then((resp) => resp.json()) // Transform the data into json
                            .then(function(data) {
                                local_METADATA = data;
                                console.log(local_METADATA);

                                for (let i = 0; i < local_METADATA.length; i++) {
                                

                                    let curLat = local_METADATA[i].centroid_coordinates["lat"].toString();
                                    let curLong = local_METADATA[i].centroid_coordinates["lon"].toString();
                                    let full_pic_url = EPIC_PHOTO + (tomorrow.getFullYear()) + '/' + (month)
                                        +'/' + day + '/jpg/' + local_METADATA[i].image + '.jpg';
                                    let thumbs_pic_url = EPIC_PHOTO + (tomorrow.getFullYear()) + '/' + (month)
                                        +'/' + day + '/thumbs/' + local_METADATA[i].image + '.jpg';
                                    if((lat === "" && long ==="") || (curLat.substring(0,curLat.indexOf(".")) === lat && curLong.substring(0,curLong.indexOf(".")) === long)){
                                        IMAGES.push({
                                        // var IMAGE_FIELD = {
                                            src: full_pic_url,
                                            thumbnail: thumbs_pic_url,
                                            thumbnailWidth: 100,
                                            thumbnailHeight: 100,
                                            isSelected: false, 
                                            caption: local_METADATA[i].image + ": " + local_METADATA[i].caption + " at Latitude: " + local_METADATA[i].centroid_coordinates["lat"].toString() 
                                                + " and at Longitude: " + local_METADATA[i].centroid_coordinates["lon"].toString(),
                                        // }                           
                                        });                           
                                    }
                                
                                
                                }
                            })
                            // let dateInfo1 = this.props.dateInfo1;
                            // for (let i = 0; i < this.state.IMAGES_METADATA.length; i++) {
                            
                            //     let curLat = this.state.IMAGES_METADATA[i].centroid_coordinates["lat"].toString();
                            //     let curLong = this.state.IMAGES_METADATA[i].centroid_coordinates["lon"].toString();
                            //     let full_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
                            //         +'/' + dateInfo1["day"] + '/jpg/' + this.state.IMAGES_METADATA[i].image + '.jpg';
                            //     let thumbs_pic_url = EPIC_PHOTO + dateInfo1["year"] + '/' + dateInfo1["month"] 
                            //         +'/' + dateInfo1["day"] + '/thumbs/' + this.state.IMAGES_METADATA[i].image + '.jpg';
                            //     if((lat === "" && long ==="") || (curLat.substring(0,curLat.indexOf(".")) === lat && curLong.substring(0,curLong.indexOf(".")) === long)){
                            //         IMAGES.push({
                            //         // var IMAGE_FIELD = {
                            //             src: full_pic_url,
                            //             thumbnail: thumbs_pic_url,
                            //             thumbnailWidth: 100,
                            //             thumbnailHeight: 100,
                            //             isSelected: false, 
                            //             caption: this.state.IMAGES_METADATA[i].image + ": " + this.state.IMAGES_METADATA[i].caption + " at Latitude: " + this.state.IMAGES_METADATA[i].centroid_coordinates["lat"].toString() 
                            //                 + " and at Longitude: " + this.state.IMAGES_METADATA[i].centroid_coordinates["lon"].toString(),
                            //         // }                           
                            //         });                           
                            //     }
                            // }
                            
                            
                            tomorrow.setDate(tomorrow.getDate()+1);
                            this.refreshImageList()
                            console.log(tomorrow)
                        }

                        function str_pad(n) {
                            return String("00" + n).slice(-2);
                        }
                    }
                }
                
               
            }
            
            console.log(IMAGES)
    
        return(
            <div style={{
                display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}
            >
                {/* <Gallery images = {IMAGES}/> */}
                <Epic_Images images = {IMAGES} 
                            refresh={this.state.refreshImageList}
                            formValues = {this.props.formValues}
                            dates = {this.props.dates}
                            dateInfo1 = {this.props.dateInfo1}
                            dateInfo2 = {this.props.dateInfo2}
                />
            </div>
        );
    }
    refreshImageList = () =>{
        this.setState({refreshImageList: !this.state.refreshImageList})
    }
}
export default EpicForm;