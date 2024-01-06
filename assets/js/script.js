document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const cityInput = document.getElementById('cityInput').value;
    getCityCoordinates(cityInput);
});

function getCityCoordinates(city) {
    const apiKey = '076067f2f14b4396bfea2f731b908dfe'; // Replace with your actual OpenCage Geocoding API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const coordinates = data.results[0].geometry;
                displayResult(`Latitude: ${coordinates.lat.toFixed(4)}, Longitude: ${coordinates.lng.toFixed(4)}`);
                getWeatherData(coordinates.lat, coordinates.lng);
            } else {
                displayResult('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayResult('An error occurred while fetching data');
        });
}

function getWeatherData(latitude, longitude) {
    const weatherApiKey = 'a3d03e21dae3e7499210cb56d3c6f61d'; 
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
            // Process and display weather information as needed
            displayWeatherInfo(weatherData);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayWeatherInfo('Weather data not available');
        });
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.textContent = result;
    }
}

function displayWeatherInfo(weatherData) {
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('windSpeed');
    const descriptionElement = document.getElementById('description');

    if (temperatureElement && humidityElement && windSpeedElement && descriptionElement) {
        // Update GUI elements with weather information
        temperatureElement.textContent = `${weatherData.main.temp} K`; // You can convert to Celsius or Fahrenheit as needed
        humidityElement.textContent = `${weatherData.main.humidity}%`;
        windSpeedElement.textContent = `${weatherData.wind.speed} m/s`;
        descriptionElement.textContent = weatherData.weather[0].description;
    }
}