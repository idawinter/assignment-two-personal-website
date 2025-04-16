document.addEventListener("DOMContentLoaded", () => { // ensures script runs only after the HTML has been fully loaded.

//DOM Element References:

//get the form element where users input the city and number of days:
  const form = document.getElementById("weatherForecastForm"); 
//references the container where the forecast results will be displayed:
  const weatherResults = document.getElementById("weather-results"); 
//references the button that resets the form and clears weather results:
  const resetButton = document.getElementById("resetButton"); 

// API Constants
//endpoint to fetch the 5-day weather forecast:
  const API_KEY = "bc8053f974b5712146867b6f47ec0f58";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"; 
//endpoint to convert a city and country name into geographic coordinates:
  const GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct"; 
  
/* note:  if only a city name is entered, the form still works.  The above Geocoding URL was just added in case you search a city name that exists in two countries. */

// attaches an event listener to the form's submit event:
  form.addEventListener("submit", async (event) => {
      event.preventDefault(); 

// clears previous results:
      weatherResults.innerHTML = ""; 

// fetches the city and country input entered by the user:
      const cityInput = document.getElementById("city-name").value;
// gets the number of days for the forecast:
      const days = parseInt(document.getElementById("days").value); 

// checks if the user requested a valid number of days, send error message if not.
      if (days < 1 || days > 5) {
          weatherResults.innerHTML = `<p>Please enter a number between 1 and 5 for the days.</p>`;
          return; 
      }

// Get Latitude and Longitude from Geocoding API and parse the response JSON into geoData:
      try {
          
          const geoResponse = await fetch(`${GEOCODING_URL}?q=${cityInput}&limit=1&appid=${API_KEY}`);
          const geoData = await geoResponse.json();

// If the API response does not contain data, throw an error indicating the city was not found:

          if (!geoData.length) {
              throw new Error("City not found. Please specify a city and country.");
          }

//extracts latitude, longitude, name and country from the first result:
          const { lat, lon, name, country } = geoData[0];

// Get Forecast Data using Latitude and Longitude and check if response if valid and parse data:
          const forecastResponse = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
          if (!forecastResponse.ok) {
              throw new Error("Error fetching forecast data.");
          }

          const forecastData = await forecastResponse.json();

//call the displayDailyForecast function to display the results:          
          displayDailyForecast(forecastData, days, name, country);

//error message if invalid city or API issues:
      } catch (error) {
          weatherResults.innerHTML = `<p>Error: ${error.message}</p>`;
      }
  });

//attach an event listener to the reset button, clear all input fields
  resetButton.addEventListener("click", () => {
      form.reset();
      weatherResults.innerHTML = "";
  });

//filter forecast data to give one result per day, not every three hours:

  function displayDailyForecast(data, days, city, country) {
      const dailyForecasts = data.list.filter((forecast) => forecast.dt_txt.includes("12:00:00"));

// Limit the forecasts to the requested number of days:
      const limitedForecasts = dailyForecasts.slice(0, days);

// displays a message if no forecast data is available for the requested days:
      if (limitedForecasts.length === 0) {
          weatherResults.innerHTML = `<p>No forecast data available for the requested number of days.</p>`;
          return;
      }

// Generate HTML string for the forecast data to include date, temperature, weather description and humidity:
      const resultsHtml = `
          <h2>Weather Forecast for ${city}, ${country}</h2>
          <div class="forecast">
              ${limitedForecasts
                  .map((forecast) => {
                      const date = new Date(forecast.dt_txt);
                      return `
                          <div class="weather-info">
                              <p><strong>${date.toDateString()}</strong></p>
                              <p>Temperature: ${forecast.main.temp}°C</p>
                              <p>Weather: ${forecast.weather[0].description}</p>
                              <p>Humidity: ${forecast.main.humidity}%</p>
                          </div>`;
                  })
                  .join("")}
          </div>`;
      weatherResults.innerHTML = resultsHtml;
  }
});
