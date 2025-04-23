const apiKey = "f1be3362513344caa71102713240710";

document.addEventListener('DOMContentLoaded', function () {
  const submit = document.getElementById('submit');
  const cityInput = document.getElementById('city');
  const cityname = document.getElementById('cityname');

  // List of cities and their corresponding DOM ID suffixes
  const cities = [
    { name: "Bengaluru", idSuffix: "NY" },
    { name: "Chennai", idSuffix: "S" },
    { name: "Shanghai", idSuffix: "B" },
    { name: "Barcelona", idSuffix: "M" },
    { name: "New York", idSuffix: "P" },
    { name: "Mumbai", idSuffix: "C" },
    { name: "Indore", idSuffix: "I" },

  ];

  async function getWeather(city, idSuffix) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    
      // Update the city name in the DOM
      cityname.innerHTML = data.location.name;

      // Update weather data in the cards
      document.getElementById('temp_c').innerHTML = data.current.temp_c;
      document.getElementById('temp_c2').innerHTML = data.current.temp_c;
      document.getElementById('feelslike_c').innerHTML = data.current.feelslike_c;
      document.getElementById('feelslike_f').innerHTML = data.current.feelslike_f;
      document.getElementById('wind_mph').innerHTML = data.current.wind_mph;
      document.getElementById('wind_kph').innerHTML = data.current.wind_kph;
      document.getElementById('wind_kph2').innerHTML = data.current.wind_kph;
      document.getElementById('wind_dir').innerHTML = data.current.wind_dir;
      document.getElementById('humidity').innerHTML = data.current.humidity;
      document.getElementById('humidity2').innerHTML = data.current.humidity;
      document.getElementById('cloud').innerHTML = data.current.cloud;
      document.getElementById('dewpoint_c').innerHTML = data.current.dewpoint_c;

      // Update weather data for this city in the tab
      document.getElementById(`cloud${idSuffix}`).innerHTML = data.current.cloud;
      document.getElementById(`humidity${idSuffix}`).innerHTML = data.current.humidity;
      document.getElementById(`feelslike_c${idSuffix}`).innerHTML = data.current.feelslike_c;
      document.getElementById(`feelslike_f${idSuffix}`).innerHTML = data.current.feelslike_f;
      document.getElementById(`temp_c${idSuffix}`).innerHTML = data.current.temp_c;
      document.getElementById(`temp_f${idSuffix}`).innerHTML = data.current.temp_f;
      document.getElementById(`wind_kph${idSuffix}`).innerHTML = data.current.wind_kph;
      document.getElementById(`wind_mph${idSuffix}`).innerHTML = data.current.wind_mph;
      document.getElementById(`windchill_c${idSuffix}`).innerHTML = data.current.windchill_c;
      document.getElementById(`windchill_f${idSuffix}`).innerHTML = data.current.windchill_f;

    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
  }

  // Function to update weather for all cities
  function updateWeatherForAllCities() {
    cities.forEach(city => {
      getWeather(city.name, city.idSuffix);
    });
  }

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value || "Indore"; // Default to Indore if input is empty
    getWeather(city, "I");
  });

  // Initial call to update weather for predefined cities
  updateWeatherForAllCities();
});
