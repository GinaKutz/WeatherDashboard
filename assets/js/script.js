
    let forecastApiUrl; 

    document.getElementById('searchForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const cityInput = document.getElementById('cityInput').value;
        getCityCoordinates(cityInput);
    });

    function getCityCoordinates(city) {
        const apiKey = '076067f2f14b4396bfea2f731b908dfe'; 
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const coordinates = data.results[0].geometry;
                    displayResult(`Latitude: ${coordinates.lat.toFixed(4)}, Longitude: ${coordinates.lng.toFixed(4)}`);
                    forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=YOUR_OPENWEATHERMAP_API_KEY`;
                    getWeatherData(coordinates.lat, coordinates.lng);
                    addToSearchHistory(city);
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




       // Fetch current weather
        fetch(weatherApiUrl)
            .then(response => response.json())
            .then(weatherData => {
                // Process and display current weather information
                displayWeatherInfo(weatherData);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayWeatherInfo('Weather data not available');
            });


    function getForecast(latitude, longitude) {
        const weatherApiKey = 'a3d03e21dae3e7499210cb56d3c6f61d';
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${weatherApiKey}`;
        

        document.getElementById('searchForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const cityInput = document.getElementById('cityInput').value;
            getCityCoordinates(cityInput);
        });

        function getCityCoordinates(city) {
            const apiKey = '076067f2f14b4396bfea2f731b908dfe'; 
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        const coordinates = data.results[0].geometry;
                        displayResult(`Latitude: ${coordinates.lat.toFixed(4)}, Longitude: ${coordinates.lng.toFixed(4)}`);
                        forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=YOUR_OPENWEATHERMAP_API_KEY`;
                        getWeatherData(coordinates.lat, coordinates.lng);
                        addToSearchHistory(city);
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
            const weatherApiKey = 'a3d03e21dae3e7499210cb56d3c6f61'; // Replace with your actual OpenWeatherMap API key
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

            // Fetch current weather
            fetch(weatherApiUrl)
                .then(response => response.json())
                .then(weatherData => {
                    // Process and display current weather information
                    displayWeatherInfo(weatherData);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    displayWeatherInfo('Weather data not available');
                });

            // Fetch 5-day forecast
            fetch(forecastApiUrl)
                .then(response => response.json())
                .then(forecastData => {
                    // Process and display 5-day forecast information
                    displayForecast(forecastData);
                })
                .catch(error => {
                    console.error('Error fetching forecast data:', error);
                    displayForecast('Forecast data not available');
                });
        }

        function addToSearchHistory(city) {
            const historyList = document.getElementById('historyList');
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#'; // You can set this to the URL where you want to perform the search
            link.textContent = city;
            link.addEventListener('click', function() {
                // Handle the click event to trigger a search with the city
                getCityCoordinates(city);
            });
            listItem.appendChild(link);
            historyList.appendChild(listItem);
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
                // Convert temperature from Kelvin to Fahrenheit
                const temperatureFahrenheit = (weatherData.main.temp - 273.15) * 9/5 + 32;

                // Update GUI elements with current weather information
                temperatureElement.textContent = `${temperatureFahrenheit.toFixed(2)} °F`;
                humidityElement.textContent = `${weatherData.main.humidity}%`;
                windSpeedElement.textContent = `${weatherData.wind.speed} m/s`;
                descriptionElement.textContent = weatherData.weather[0].description;
            }
        }

        function displayForecast(forecastData) {
            const forecastList = document.getElementById('forecastList');
            forecastList.innerHTML = ''; // Clear previous forecast items

            if (forecastData.list) {
                // Display the forecast for every 24 hours (1 day)
                for (let i = 0; i < forecastData.list.length; i += 8) {
                    const forecastItem = forecastData.list[i];
                    const forecastDate = new Date(forecastItem.dt * 1000);
                    const forecastDateString = forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    const forecastTemperature = (forecastItem.main.temp - 273.15) * 9/5 + 32;

                    const forecastListItem = document.createElement('li');
                    forecastListItem.textContent = `${forecastDateString}: ${forecastTemperature.toFixed(2)} °F`;
                    forecastList.appendChild(forecastListItem);
                }
            }
        }    
        // Fetch 5-day forecast
        fetch(forecastApiUrl)
            .then(response => response.json())
            .then(forecastData => {
                // Process and display 5-day forecast information
                displayForecast(forecastData);
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                displayForecast('Forecast data not available');
            });
    }
}

    function addToSearchHistory(city) {
        const historyList = document.getElementById('historyList');
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = city;
        link.addEventListener('click', function() {
            // Handle the click event to trigger a search with the city
            getCityCoordinates(city);
        });
        listItem.appendChild(link);
        historyList.appendChild(listItem);
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
            // Convert temperature from Kelvin to Fahrenheit
            const temperatureFahrenheit = (weatherData.main.temp - 273.15) * 9/5 + 32;

            // Update GUI elements with current weather information
            temperatureElement.textContent = `${temperatureFahrenheit.toFixed(2)} °F`;
            humidityElement.textContent = `${weatherData.main.humidity}%`;
            windSpeedElement.textContent = `${weatherData.wind.speed} m/s`;
            descriptionElement.textContent = weatherData.weather[0].description;
        }
    }

    function displayForecast(forecastData) {
        const forecastList = document.getElementById('forecastList');
        forecastList.innerHTML = ''; // Clear previous forecast items

        if (forecastData.list) {
            // Display the forecast for every 24 hours (1 day)
            for (let i = 0; i < forecastData.list.length; i += 8) {
                const forecastItem = forecastData.list[i];
                const forecastDate = new Date(forecastItem.dt * 1000);
                const forecastDateString = forecastDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                const forecastTemperature = (forecastItem.main.temp - 273.15) * 9/5 + 32;

                const forecastListItem = document.createElement('li');
                forecastListItem.textContent = `${forecastDateString}: ${forecastTemperature.toFixed(2)} °F`;
                forecastList.appendChild(forecastListItem);
            }
        }
    }



