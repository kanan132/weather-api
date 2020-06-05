let url = 'https://api.openweathermap.org/data/2.5/forecast';
let api_key = "8df91e2474f634ad5aa46cf685f3b66c";

let weather = new CurrentWeather(url, api_key);

function timestamp_to_date (seconds){
    return new Date(seconds * 1000).toISOString().slice(0, 19).replace('T', ' ');
}

function get_records() {
    let records = [];
    for(let i = 0; i < window.localStorage.length; i++) {
    
    	let k  = window.localStorage.key(i); 
    
        if (k.startsWith("city_")) {
    
        	let record = window.localStorage.getItem(k);
    
        	let data = {city: k, data: JSON.parse(record)}
    
            records.push(data);
        }

    }
    return records;
}

document.querySelector("#submit-button").addEventListener("click", () => {
    let  keyword = document.querySelector("#keyword").value;
    weather.search(keyword);
    
});

function load_data() {


	let records = get_records();
    
	let table_data = records.map(record => {
        
        return `
        <tr class="table-city">
           
            <td class="reuse">
               ${record.city.split("_")[1]}
            </td>
            <td>
                ${Math.round(record.data.list[0].main.temp - 273.15)}°C
            </td>
            <td>
                ${record.data.list[0].weather[0].description}
            </td>
        
        </tr>`;
	}).join("");
	document.getElementById("cities").innerHTML = table_data;
}

/*document.querySelector("#submit-button").addEventListener('click',()=>{
    load_data();
})*/
window.load = load_data();

function touching_city(){ 
    document.querySelector(".reuse").addEventListener('click',(e) => {
        let  value=e.target.value;
        let result=weather.search(value);
        return weather.render_data_to_dom(result.data);
    })
}