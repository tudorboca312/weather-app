import "./style.css";
import { getWeather } from "./weather";
import { ICON_MAP } from "./iconMap";

let locationApp = document.querySelector(`.location`);
let dateNow = document.querySelector(`.date`);
// ICON
let temp = document.querySelector(`.number-temp`);
let humidity = document.querySelector(`.humidity-number`);
let wind = document.querySelector(`.wind-number`);
let icon = document.querySelector(`#iconUp`);
let todayMax = document.querySelector(`.today-max`);
let todayMin = document.querySelector(`.today-min`);
let flMax = document.querySelector(`.feels-max`);
let flMin = document.querySelector(`.feels-min`);

let downRow = document.querySelector(`.bottom-side`);
let dayFuture = document.querySelectorAll(`.day`);
let dayCardTemplate = document.querySelector(`#day-card-template`);
let tomorrowMin = document.querySelectorAll(`.min-temp-tomorrow`);
let tomorrowMax = document.querySelectorAll(`.max-temp-tomorrow`);
let iconFuture = document.querySelectorAll(`.iconDown`);

let searchInput = document.getElementById("search-city");
let btnSearch = document.querySelector(`.search-button`);

const days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednsday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
const months = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

var latitude;
var longitude;

// When open the window / reload the window.
window.onload = (event) => {
  // Date and time
  renderDateAndTime();
  // All the weather info from the page
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      useCoordinates(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

// When search button is pressed
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  getWeatherBySearch().then((coordinates) => {
    useCoordinates(coordinates.latitude2, coordinates.longitude2);
  });
});

// All the functions

// Getting coordonates, and rendering the weather for the current coordonates
function useCoordinates(latitude, longitude) {
  getWeather(
    latitude,
    longitude,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    .then(renderWeather)
    .catch((e) => {
      console.log(e);
      alert(`Error getting weather.`);
    });
  getCityName(latitude, longitude);
}
function getIconUrl(iconCode) {
  return ICON_MAP.get(iconCode);
}

// Rendering weather for current and daily
function renderWeather({ current, daily }) {
  renderCurrentWeather(current, daily);
  renderDailyWeather(daily);
}

// Searching city for the weather
function getWeatherBySearch() {
  return fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput.value}&count=1`
  )
    .then((response) => response.json())
    .then((data) => {
      const latitude2 = data.results[0].latitude;
      const longitude2 = data.results[0].longitude;
      return { latitude2, longitude2 };
    })
    .catch((e) => {
      console.log(e);
      alert(`Incorrect city name!`);
    });
}

// Getting the Current date and time
function renderDateAndTime() {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();

  dateNow.textContent = `${days[day]}, ${date}, ${months[month]}`;
}

// Get the current city name
function getCityName(latitude, longitude) {
  const apiKey = "d51467c2549644439fcf914fe3cbc73c";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const cityName =
          data.results[0].components.city ||
          data.results[0].components.town ||
          data.results[0].components.village;
        locationApp.textContent = cityName;
      } else {
        console.log("No results found");
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}

// Puttng into the UI all the current weather
function renderCurrentWeather(current, daily) {
  icon.src = getIconUrl(current.iconCode);
  temp.textContent = current.currentTemp;
  humidity.textContent = current.precip;
  wind.textContent = current.windSpeed;
  todayMax.textContent = daily[0].maxtemp;
  todayMin.textContent = daily[0].mintemp;
  flMax.textContent = current.highFeelsLike;
  flMin.textContent = current.lowFeelsLike;
}

// Putting into the UI all the next days weather
const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" });
function renderDailyWeather(dailyData) {
  for (let i = 0; i < dailyData.length; i++) {
    let dateTomorrow = dayFuture[i];
    let iconHere = iconFuture[i];
    let max = tomorrowMax[i];
    let min = tomorrowMin[i];
    let theDate = DAY_FORMATTER.format(dailyData[i].timestamp);

    dateTomorrow.textContent = theDate.slice(0, 3);
    iconHere.src = getIconUrl(dailyData[i].iconCode);
    max.textContent = dailyData[i].maxtemp;
    min.textContent = dailyData[i].mintemp;
  }
}
