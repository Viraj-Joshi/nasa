import React, {Component} from 'react';
import M from "materialize-css";
import Gallery from 'react-grid-gallery';

class LandSatForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            IMAGE:{
                date:"",
                id: "",
                resource:{
                    dataset: "",
                    planet: ""
                },
                service_version: "",
                url: ""
            },
            
            isFullyRendered: false,
            isLoading : false,
            refreshImageList: false,
            noElements: false,
        }
        this._isMounted = true;
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    componentDidMount(){
        M.AutoInit();
        
        
        
        //we do not make api request for invalid form requests
        console.log(this.props.formValues["pressed"])
        const LS_PHOTO = 'https://api.nasa.gov/planetary/earth/imagery?'; 
        if(!this.props.formValues["pressed"]  && this.props.formValues["isValid"] && this.props.formValues["selectedCategory"] === '2'){
            //console.log(LS_PHOTO + 'lon=' + lon.toString() + "&lat="+ lat.toString()+"&date="+year + "-"+month+"-"+day+"&api_key=" + process.env.REACT_APP_NASA_API_KEY)
            this._isMounted && this.setState({isLoading: true})
            this._isMounted && this.getData(this.props.dateInfo1["year"], this.props.dateInfo1["month"], this.props.dateInfo1["day"], this.props.formValues["latitude"],this.props.formValues["longitude"]);
        }
        

        
    }
    componentWillReceiveProps(nextProps){
        
        this._isMounted && this.getData(this.props.dateInfo1["year"], this.props.dateInfo1["month"], this.props.dateInfo1["day"], this.props.formValues["latitude"],this.props.formValues["longitude"]);
        this._isMounted && this.setState({isLoading:true})
        this._isMounted && this.setState({noElements: false})
        
    }
    getData = (year,month,day,lat,lon) => {
        const LS_PHOTO = 'https://api.nasa.gov/planetary/earth/imagery?'; 
        let temp = this.state.IMAGE;

        fetch(LS_PHOTO + 'lon=' + lon.toString() + "&lat="+ lat.toString()+"&date="+year + "-"+month+"-"+day+"&api_key=" + process.env.REACT_APP_NASA_API_KEY)
        .then((resp) => {
            if(!resp.ok){
                this._isMounted && this.setState({noElements: true})
            }
            
            //console.log(resp.json())
            //console.log(LS_PHOTO + 'lon=' + lon.toString() + "&lat="+ lat.toString()+"&date="+year + "-"+month+"-"+day+"&api_key=" + process.env.REACT_APP_NASA_API_KEY)
            return resp.json()
        })
        .then((data) => {   
            console.log(data)
            
            temp.url = data["url"];
            temp["date"] = data["date"];
            temp["id"] = data["id"];
            console.log(temp)
            this._isMounted && this.setState({IMAGE:temp})
            this._isMounted && this.setState({isLoading: false})
            //this.refreshImageList();
            //return data;
        });
    }
    render(){
        
        const LS_PHOTO = 'https://api.nasa.gov/planetary/earth/imagery?';                      
        var template = {};
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
            var array_template = [];
            
              let dateInfo1 = this.props.dateInfo1;
              let dateInfo2 = this.props.dateInfo2;
              if(this.props.formValues["selectedCategory"] === '2'){
                if(!this.props.formValues["pressed"] && this.props.dates["startDate"]!=="" && this.props.dates["endDate"] === ""){
                    template = {
                        src: this.state.IMAGE["url"],
                        thumbnail: this.state.IMAGE["url"],
                        thumbnailWidth: 100,
                        thumbnailHeight: 100,
                        isSelected: false, 
                        caption: 'LandSat 8 Imagery of Earth on ' + this.state.IMAGE["date"] + " at Latitude: " + lat 
                        + " and at Longitude: " + long,
                    }
                    array_template = [template]    
                }else if(!this.props.formValues["pressed"] && this.props.dates["startDate"]!=="" && this.props.dates["endDate"] !== ""){
                    array_template = []
                    var startDate = new Date(dateInfo1["year"],Number(parseInt(dateInfo1["month"])-1),dateInfo1["day"]);
                    var endDate = new Date(dateInfo1["year"],Number(parseInt(dateInfo2["month"])-1),dateInfo2["day"]);
                        // console.log(startDate);
                        // console.log(endDate)
                    let tomorrow = startDate;
                    
                    while(Date.parse(tomorrow)<=Date.parse(endDate)){
                        let day = str_pad(tomorrow.getDate());
                        let month = str_pad(tomorrow.getMonth()+1);
                        let url = LS_PHOTO + 'lon=' + long.toString() + "&lat="+ lat.toString()+"&date="+tomorrow.getFullYear() + "-"+month+"-"+day+"&api_key=" + process.env.REACT_APP_NASA_API_KEY;
                        fetch(url)
                        .then((resp) =>{
                            if(!resp.ok){
                                this._isMounted && this.setState({noElements: true})
                            }else{
                                
                                this._isMounted && this.setState({noElements: false})
                                
                            }
                            return resp.json();
                        }) // Transform the data into json
                        .then(function(data) {
                            array_template.push({
                                src: data["url"],
                                thumbnail: data["url"],
                                thumbnailWidth: 100,
                                thumbnailHeight: 100,
                                isSelected: false, 
                                caption: 'LandSat 8 Imagery of Earth on ' + data["date"] + " at Latitude: " + lat 
                                + " and at Longitude: " + long,
                            })
                        })
                        tomorrow.setDate(tomorrow.getDate()+1);
                        //this.refreshImageList()
                        console.log(tomorrow)
                    }
                    function str_pad(n) {
                        return String("00" + n).slice(-2);
                    }
                }
            }
        }    
        let e = this.state.noElements;
        console.log(this.state.IMAGE)
        return(
            <div>
                {e && 
                    <p className = "container">No Elements Available, try changing your date or location </p>
                }
                {!e &&
                    <div className = "offset-s6">
                        <Gallery images={array_template}/>
                    </div>
                }
            </div>
            
        );

        
    }
    refreshImageList = () =>{
        this.setState({refreshImageList: !this.state.refreshImageList})
    }
}
export default LandSatForm;
