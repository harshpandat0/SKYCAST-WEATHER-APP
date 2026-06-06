const apiKey = "YOUR_API_KEY";

document
.getElementById("city")
.addEventListener("keypress", function(e){

if(e.key==="Enter"){
getWeather();
}

});

async function getWeather(){

const city =
document.getElementById("city").value;

if(city===""){
alert("Enter a city name");
return;
}

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetchData(weatherURL,forecastURL);

}

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat = position.coords.latitude;
const lon = position.coords.longitude;

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetchData(weatherURL,forecastURL);

},

()=>{
alert("Location permission denied");
}

);

}

async function fetchData(weatherURL,forecastURL){

try{

const weatherResponse =
await fetch(weatherURL);

const weatherData =
await weatherResponse.json();

if(weatherData.cod != 200){

document.getElementById("weather")
.innerHTML =
`<h2>${weatherData.message}</h2>`;

return;
}

const forecastResponse =
await fetch(forecastURL);

const forecastData =
await forecastResponse.json();

displayWeather(weatherData);

displayForecast(forecastData);

}
catch(error){

document.getElementById("weather")
.innerHTML =
"<h2>Something went wrong</h2>";

console.error(error);

}

}

function displayWeather(data){

const weather =
document.getElementById("weather");

weather.innerHTML = `

<img
class="weather-icon"
src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">

<h2>${data.name}</h2>

<h1>${Math.round(data.main.temp)}°C</h1>

<p>${data.weather[0].description}</p>

<p>💧 Humidity: ${data.main.humidity}%</p>

<p>🌬 Wind: ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>

`;

}

function displayForecast(data){

let forecastHTML = "";

for(let i=0;i<5;i++){

const item = data.list[i*8];

forecastHTML += `

<div class="forecast-card">

<p>${item.dt_txt.split(" ")[0]}</p>

<img
src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">

<p>${Math.round(item.main.temp)}°C</p>

<p>${item.weather[0].main}</p>

</div>

`;

}

document.getElementById("forecast-title")
.innerText = "5-Day Forecast";

document.getElementById("forecast")
.innerHTML = forecastHTML;

}