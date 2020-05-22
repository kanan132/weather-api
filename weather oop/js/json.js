class CurrentWeather {
    constructor(url, api_key) {
        this.url = url;
        this.api_key = api_key;
        
    }
    

    render_data_to_dom = (data) => {
        document.querySelector("#main").innerHTML=` <div class="col-md-6">
            <ul>
                <h4>Coordinates:</h4><li class="coordinate forward"  >
                   lon: ${data.coord.lon}
                   <br/>
                   lat: ${data.coord.lat}
                </li>
            </ul> 
            <ul>   
                <h4>Name:</h4><li class="city forward"  >
                    ${data.name}
                </li>
            </ul>
            <ul>
                <h4>Country:</h4><li class="country forward">
                    ${data.sys.country}
                </li>
            </ul>
            <ul>
                <h4>Sun:</h4><li class="sun forward">
                    Sunrise:${timestamp_to_date(data.sys.sunrise)}
                    <br/>
                    Sunset:${timestamp_to_date(data.sys.sunset)}
                </li>
            </ul>
            <ul>
                <h4>Weather:</h4><li class="weather forward">
                    ${data.weather[0].description}
                </li>
            </ul>
            <ul>
                <h4>Main:</h4><li class="main forward">
                   temp: ${data.main.temp} K
                   <br/>
                   temp: ${data.main.temp - 273.15} C
                   <br/>
                   pressure: ${data.main.pressure}

                </li>
            </ul>
            <ul>
                <h4>Wind:</h4><li class="wind forward">
                   speed: ${data.wind.speed}
                </li>
 
            </ul>
        </div>`;
            
            
    }
  

    search(keyword) {
        let url = `${this.url}/?appid=${this.api_key}&q=${keyword}`;
    
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                this.render_data_to_dom(data);
                this.weather_storage(keyword,data);

                
            }).catch(err => console.log(err.message));
    }

    weather_storage(keyword,data){
        window.localStorage.setItem(keyword, JSON.stringify(data));
    }

    // getting_features(keyword){
        
    //     let searched_city=JSON.parse(localStorage.getItem("lastCity"));
    //     //document.querySelector("#last").innerHTML=searched_city.name;
    //     document.querySelector("#last").innerHTML=`<div class="col-md-6">
             
    //         <ul>   
    //             <h4>Name:</h4><li class="city forward"  >
    //                 ${searched_city.name}
    //             </li>
    //         </ul> 
    //         <ul>
    //             <h4>Weather:</h4><li class="weather forward">
    //                 ${searched_city.weather[0].description}
    //             </li>
    //         </ul>
    //         <ul>
    //             <h4>Main:</h4><li class="main forward">
    //                temp: ${searched_city.main.temp} K
    //             </li>
    //         </ul>`
        
    //     /*let searched_city=localStorage.getItem(keyword).split(",");
    //     for(let i=0;i<searched_city.length;i++){
    //         document.querySelector(".table").innerHTML+="<tr><td>"+ searched_city[i].keyword+ "</td><td>" + searched_city[i].get_temp+ "</td><td>" + searched_city[i].get_weather+"</td></tr>";
    //     }*/

    // }

    // filling_array(keyword){
    //     let last_searches = localStorage.getItem(keyword);
    //     if (last_searches == undefined) {
    //     last_searches = [];
    //     } else {
    //     last_searches = last_searches.split(",");
    //     }
    // }

    // changing_city(){
    //     if (last_searches.length !== 0){
    //         let last_value = last_searches[last_searches.length-1];
    //         localStorage.setItem("lastCity",last_value);
            
    //     }   
    // }
    
}