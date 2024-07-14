const apiKey = 'cc86ac780bf1b34a8d363fbd58836a51';
let cityName = '';

// Local storage key for recent searches
const recentSearchesKey = 'recentSearches';
const maxRecentSearches = 8;

// Function to store recent search in local storage
function storeRecentSearch(searchTerm) {
  let recentSearches = JSON.parse(localStorage.getItem(recentSearchesKey)) || [];
  recentSearches = recentSearches.concat(searchTerm).slice(-maxRecentSearches);
  localStorage.setItem(recentSearchesKey, JSON.stringify(recentSearches));
}

// Function to retrieve recent searches from local storage
function getRecentSearches() {
  return JSON.parse(localStorage.getItem(recentSearchesKey)) || [];
}



function currentWeatherData(lat, lon){
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    let iconURL = `https://openweathermap.org/img/wn/10d@2x.png`
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        document.getElementById('current').innerHTML = '';

        let h1 = document.createElement("H1");
        h1.textContent = `${data.name} (${dayjs().format('MM/DD/YYYY')})`;
        document.getElementById("current").append(h1);

        let temp = document.createElement("p");
        temp.textContent = `Temp: ${data.main.temp} F`;
        temp.setAttribute("class", "currentWeather");
        document.getElementById("current").append(temp);

        let wind = document.createElement("p");
        wind.textContent = `Wind: ${data.wind.speed} MPH`;
        wind.setAttribute("class", "currentWeather");
        document.getElementById("current").append(wind);

        let humidity = document.createElement("p");
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        humidity.setAttribute("class", "currentWeather");
        document.getElementById("current").append(humidity);

    })
}

function getFiveDayForecast(lat, lon) {
    let URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data); // This will contain the 5-day forecast data

        // Filter the forecast data for 12 PM each day
        const filteredForecast = data.list.filter(forecast => {
            // Check if the forecast time is 12:00:00
            return new Date(forecast.dt * 1000).getUTCHours() === 12;
        });

        document.getElementById('forecast').innerHTML = '';


        // Display the filtered forecast data on the webpage
        filteredForecast.forEach(forecast => {
            
            let h1 = document.createElement("H1");
            const date = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
            h1.textContent = `${data.city.name} (${date})`;
            document.getElementById("forecast").append(h1);

            let temp = document.createElement("p");
            temp.textContent = `Temp: ${forecast.main.temp} F`;
            temp.setAttribute("class", "forecastWeather");
            document.getElementById("forecast").append(temp);

            let wind = document.createElement("p");
            wind.textContent = `Wind: ${forecast.wind.speed} MPH`;
            wind.setAttribute("class", "forecastWeather");
            document.getElementById("forecast").append(wind);

            let humidity = document.createElement("p");
            humidity.textContent = `Humidity: ${forecast.main.humidity} %`;
            humidity.setAttribute("class", "forecastWeather");
            document.getElementById("forecast").append(humidity);
        });
      })
}



document.getElementById('button').addEventListener("click", function(e) {
e.preventDefault();
cityName = document.getElementById('cityname').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        currentWeatherData(data[0].lat, data[0].lon);
        getFiveDayForecast(data[0].lat, data[0].lon);

    })
});








