// scripts.js
// OpenweatherApi- https://openweathermap.org/api
// Event listener to run the code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // API key for OpenWeatherMap API
    const apiKey = "1a097769b34714bad4d95851e5d8ceb5"; 
    // Displaying student information
    const studentInfo = document.getElementById("student-info");
    studentInfo.textContent = "Student Name: Sarvnoor Singh | Student ID: 200552807";

    // To fetch current weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Barrie&appid=${apiKey}`)
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            displayCurrentWeather(data); // Call function 
        })
        .catch(error => {
            console.error("Error fetching current weather:", error);
        });

    // Fetch 3-hour forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${apiKey}`)
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            displayForecast(data); // Call function to display forecast
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
        });

    // Function to display current weather
    function displayCurrentWeather(data) {
        const currentWeatherDiv = document.getElementById("current-weather");

        // To get the weather condition code
        const weatherCode = data.weather[0].icon;
        
        // To set the background image of the weather icon div based on the weather condition
        currentWeatherDiv.querySelector('.weather-icon').style.backgroundImage = `url('https://openweathermap.org/img/wn/${weatherCode}.png')`;
        
        // To display textual weather information
        const weatherInfoDiv = currentWeatherDiv.querySelector('.weather-info');
        weatherInfoDiv.innerHTML = `
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    // Function to display 3-hour forecast
    function displayForecast(data) {
        const forecastDiv = document.getElementById("forecast");
        forecastDiv.innerHTML = "<ul>";
        for (let i = 0; i < data.list.length; i++) {
            const forecast = data.list[i];
            forecastDiv.innerHTML += `
                <li>${forecast.dt_txt}: ${forecast.main.temp} °C, ${forecast.weather[0].description}</li>
            `;
        }
        forecastDiv.innerHTML += "</ul>";
    } 
});
