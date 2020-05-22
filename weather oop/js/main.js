let url = 'https://api.openweathermap.org/data/2.5/weather';
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
            <td>
               ${record.city.split("_")[1]} 
            </td>
            <td>
                ${record.data.weather[0].description}
            </td>
            <td>
                Other thing
            </td>
            <td>
                Yet other thing;
            </td>
        </tr>`;
	}).join("");
	document.getElementById("cities").innerHTML = table_data;
}

window.load = load_data();

