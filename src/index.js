function update() {
  let actualDate = document.querySelector(".actualDate");
  let now = new Date();
  let day = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  let month1 = monthes[now.getMonth()];

  let day1 = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  actualDate.innerHTML =
    day1 + ", " + day + "/" + month1 + " " + hours + ":" + minutes;
}

update();

function displayWeather(response) {
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)} ºC`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  let wind = document.querySelector(".wind");
  let windSpeed = response.data.wind.speed * 3.6;
  wind.innerHTML = `${Math.round(windSpeed)} km/h`;
  let condition = document.querySelector(".condition");
  condition.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function defineCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#local");
  if (searchCity.value) {
    let h2 = document.querySelector("h2");
    h2.innerHTML = searchCity.value;
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=455bf93f26f747a6fa59f23eeab277c1&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", defineCity);
