const WEATHER_API_BASE_URL = 'https://api.openweathermap.org';
const WEATHER_API_KEY = 'f23ee9deb4e1a7450f3157c44ed020e1';
const MAX_DAILY_FORECAST = 5;

// create an array of searched locations

// variable declaration
const now = dayjs();
const currentDate = now.format("MMM D, YYYY");
var forecast = document.getElementById("forecast");
const fdList = document.getElementById('five-day');


date()

function date() {
    // Set current date in page header
    $("#today").text(currentDate);
}


// Get weather data from API

const displayCity = () => {
    // Get the Location entered by the user
    const userLocation = cityInput.value;

    console.log(cityInput.value);
    tellWeather(userLocation);
}

const tellWeather = (search) => {

 // Lookup the location to get the Lat/Lon
 var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
 fetch (apiUrl)
     .then(response => response.json())
     .then(data => {

         console.log(data);

         // Pick the First location from the results
         var lat = data[0].lat;
         var lon = data[0].lon;

         const myData = {
         name: data[0].name,
         country: data[0].country,
         lat: data[0].lat,
         lon: data[0].lon
         }

         console.log(myData);

         // Get the Weather
         var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;         
         fetch(apiUrl)
             .then(response => response.json())
             .then(data => {
 
                 console.log(data);
                 // Show the Current Weather Forecast 
                 displayCurrentWeather (data);

                 // Show the 5 Day Weather Forecast 
                 displayWeatherForecast(data);
                 })

             // Display the Weather
             displayWeather (myData);
             })
}



var displayCurrentWeather = (weatherData) => {
    var currentWeather = weatherData.current;


    // Display the Current Weather
    document.getElementById('temp').textContent = `Temp: ${currentWeather.temp} Celsius`;
    document.getElementById('wind').textContent = `Wind: ${currentWeather.wind_speed} MPH`; 
    document.getElementById('humidity').textContent = `Humidity: ${currentWeather.humidity}%`; 
}

    const displayWeatherForecast = (weatherData) => {

    // Get the Daily Forecasts
    const dayData = weatherData.daily;

    // Show the Forecast section
    fdList.style.display = 'flex';
    forecast.style.display = 'display';


    // Clear any current Forecasts
    fdList.innerHTML = '';

    for (let i = 0; i <MAX_DAILY_FORECAST; i++) {
    // Add the new Forecasts so they are displayed one each
    var dayForecast = dayData[i];
    var day = new Date(dayForecast.dt*1000).toLocaleDateString('en-GB', {weekday: 'long'}); 
    var icon = `<img src="https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png"/>`;
    var temp = `Temp: ${dayForecast.temp.day} Celsius`;
    var humidity = `Humidity: ${dayForecast.humidity}%`; 
    var wind = `Wind: ${dayForecast.wind_speed} MPH`;

    var newForecast = document.createElement('div'); 
    newForecast.classList.add('forecast-day'); 
    newForecast.innerHTML = `<div class="weather-info"> 
             <div class="date">
             <span>${day}</span>
             </div>
             <div class="icon">
             <span>${icon}</span>
             </div>
             <p></p>
             <div class="temperature">
             <span>${temp}</span>
             </div>
             <div class="wind">
             <span>${wind}</span>
             </div>
             <div class="humidity">
             <span>${humidity}</span>
             </div>
         </div>`;
     fdList.appendChild(newForecast);
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

// Display the name and country
const displayWeather = (weatherData) => {
    document.getElementById('city-name').innerHTML = `${weatherData.name}, ${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);

}

// Search Text and Search Button
function setSearchHistory() {
    localStorage.setItem("city", JSON.stringify(cities));
  }


    var cityInput = document.getElementById('cityInput'); 
    var searchButton = document.getElementById('searchButton');

    searchButton.addEventListener("click", function(event){
        event.preventDefault();

        forecast.style.display = 'block';

        var cityValue = document.getElementById('cityInput').value; 

        localStorage.getItem("city", cityValue);

        var savedCities = document.getElementById('saved-cities');

        var historyButton = document.createElement('div');
        historyButton.innerHTML = cityValue;
        savedCities.appendChild(historyButton); 

        var savedHistoryButtons = document.querySelectorAll("#saved-cities div");

        savedHistoryButtons.forEach(button => button.addEventListener("click", handleClick));

        // When history buttons are clicked this function will play out 

        function handleClick(event) {

            var clickedHistoryButton = event.target;
          var buttonContent = clickedHistoryButton.innerText; // Retrieve the button contents

          console.log("Updated content:", buttonContent);

          tellWeather(buttonContent);

          event.preventDefault();
    }
  
    // Call the getCity function for the search button
    displayCity();
  });


  function deleteCheck(e) {
    const item = e.target;
//DELETE TODO
if (item.classList[0] === 'fas fa-trash-alt') {
    const todo = item.parentElement;
    ///ANIMATION
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
}
  }
  function deleteCheck(e) {
    const item = e.target;
//DELETE TODO
if (item.classList[0] === 'fas fa-trash-alt') {
    const todo = item.parentElement;
    ///ANIMATION
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
}
  }