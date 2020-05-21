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
        window.localStorage.setItem(`city_${keyword}`, JSON.stringify(data));
    }
    
}