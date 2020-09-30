// Tutorial by http://youtube.com/CodeExplained


//Selecting all elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


//App Data
const weather = {};

weather.temperature = {
    unit: "celsius"
};

// App Const and Vars
const KELVIN = 273;

//Api Key
const key = "";

//Check if Browser Support Geolocation
if("geolocation" in navigator) {
   
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>"
}

// Set Users Position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//Show error when there is an issue with geolocation service
function showError(error) {
    notificationElement.style.display = "block"
    notificationElement.innerHTML = `<p> ${error.mesage} </p>`;
}

//Get Weather from Api
function getWeather(latitude, longitude) {

    let test = `http://api.openweathermap.org/data/2.5/weather?id=524901&appid=${key}`;

    let api =  `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        }) 

} 

//Show in Screen
function displayWeather() {
    iconElement.innerHTML = `<img src="images/${weather.iconId}.png" >`;
    tempElement.innerHTML = `${weather.temperature.value}º <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country} `; 
}

//C to F Conversion
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5 ) + 32;
}

//Conversão na tela
tempElement.addEventListener("click", () => {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius") {

        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}º <span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    } else {

        tempElement.innerHTML = `${weather.temperature.value}º <span>C</span>`;
        weather.temperature.unit = "celsius";

    }
})