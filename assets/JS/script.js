$(document).ready(function() {

const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

// create an array of searched locations

// variable declaration
const now = dayjs();
const currentDate = now.format("MMM D, YYYY");
const forecast = document.getElementById("forecast-days");
const searchButton = document.getElementById('search-button');

date()

function date() {
    // Set current date in page header
    $("#today").text(currentDate);
}

const displayLocation = () => {
    // Get the Location entered by the user
    var currentLocation = location.value;

    showWeather(currentLocation);
}


// Get weather data from API

const showWeather = (search) => {

    // search location to get Latitude and Longitude
    var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    fetch (apiUrl)
        .then(response => response.json())
        .then(data => {
            

            // Pick the First location from the results
            //const location = data[0];
var lat = data[0].lat;
            var lon = data[0].lon;

            // Display the Current Weather

            const myData = {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            }

            console.log(myData)

            // Get the Weather for the cached location
            var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`; 
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    // Display the Current Weather
                    displayCurrentWeather(data);

                    // Display the 5 Day Forecast
                    displayWeatherforecast(data);
                })
            displayWeather(myData);
        })
}


//Display current weather on top

var displayCurrentWeather = (weatherData) => {

    //current weather section
    $("#city").text(data.current.name);
    $("#conditions").text(data.current.weather[0].main);
    $("#temperature").text(`${parseInt(data.current.main.temp)}\u00B0 F`);
    $("#humidity").text(`${data.current.main.humidity}%`);
    $("#wind-speed").text(`${data.current.wind.speed} mph`);
}


const displayWeatherforecast = (weatherData) => {

    // GET THE dAILY FORECAST
    const dailyData = weatherData.daily;

    // SHOW THE FORECAST
    document.getElementById('forecast').style.display = 'block';

    // show the forecast section
    const forecastList = document.getElementById('forecast-days');
    forecastList.innerHTML = " ";

    // Add the new forecast so they are displayed

    for (i = 0; i < MAX_DAILY_FORECAST; i++) {
        const dailyForecast = dailyData[i];
        const day = new Date(dailyForecast.dt * 1000).toLocalDataString('en-GB', { weekday: 'long' });
        const conditions = `${currentweather[0].main}MPH`;
        const temp = `${dailyForecast.temperature.day}°`;
        const humidity = `${dailyForecast.humidity.day}%`;
        const wind = `${dailyForecast.wind.day}MPH`;

        const newForecast = document.createElement('div');
        newForecast.classList.add('forecast-day');
        newForecast.innerHTML = `<div class ="weather-info">
        <div class ="date">
        <span>${day}</span>
        </div>
        <div class ="condition">
        <span>${conditions}</span>
        </div>
        <div class ="temperature">
        <span>${temp}</span>
        </div>
        <div class ="humidity">
        <span>${humidity}</span>
        </div>
        <div class ="wind">
        <span>${wind}</span>
        </div>
        </div>`;
        forecastList.appendChild(newForecast);
    }
}


const getWeather = (lat, lon) => {

    // Get the Weather
    var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Show the Current Weather Forecast
            displayCurrentWeather(data);

            // Show the 5 Day Weather Forecast
            displayWeatherForecast(data);
        })
}

const displayWeather = (weatherData) => {
    document.getElementById('location-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);
}


// local storage /save


searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    forecast.style.display = 'block';

    var city = document.getElementById('location').value;

    localStorage.setItem("city", city);

    var searchHistory = document.getElementById('search-history');

    searchHistory.innerHTML = city;

    var savedHistory = document.querySelectorAll("#savedHistory");

    savedHistory.forEach(button => button.addEventListener("click", handleClick));

        // When history buttons are clicked this function will play out 

        function handleClick(event) {

         var clickedHistoryButton = event.target;
          var buttonContent = clickedHistoryButton.innerText; // Retrieve the button contents

          console.log("Updated content:", buttonContent);

          showWeather(buttonContent);

          event.preventDefault();
        }

    // Call the getCity function for the search button
    displayLocation();
});


});
