let url = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = "8df91e2474f634ad5aa46cf685f3b66c";

let weather = new CurrentWeather(url, api_key);

function timestamp_to_date (seconds){
    return new Date(seconds * 1000).toISOString().slice(0, 19).replace('T', ' ');
}

document.querySelector("#submit-button").addEventListener("click", () => {
    let  keyword = document.querySelector("#keyword").value;
    weather.search(keyword);
    
});


