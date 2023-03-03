// import axios from "axios";
// import { getWeatherBySearch } from "./main";
// export function getSearch(timezone) {
//   getWeatherBySearch().then((coordinates) => {
//     console.log(coordinates.latitudinea);
//     console.log(coordinates.longitudinea);
//     return axios
//       .get(
//         "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&timeformat=unixtime",
//         {
//           params: {
//             latitude: latitudinea,
//             longitude: longitudinea,
//             timezone,
//           },
//         }
//       )
//       .then(({ data }) => {
//         // return data;
//         return {
//           current: parseCurrentWeather(data),
//           daily: parseDailyWeather(data),
//         };
//       });
//   });
// }

// function parseCurrentWeather({ current_weather, daily }) {
//   const {
//     temperature: currentTemp,
//     windspeed: windSpeed,
//     weathercode: iconCode,
//   } = current_weather;

//   const {
//     temperature_2m_max: [maxTemp],
//     temperature_2m_min: [minTemp],
//     precipitation_sum: [precip],
//     sunrise: [sunriseToday],
//     sunset: [sunsetToday],
//   } = daily;

//   return {
//     currentTemp: Math.round(currentTemp),
//     windSpeed: Math.round(windSpeed),
//     hightTemp: Math.round(maxTemp),
//     lowTemp: Math.round(minTemp),
//     sunriseToday: transformSun(sunriseToday),
//     sunsetToday: transformSun(sunsetToday),
//     precip: Math.round(precip * 100) / 100,
//     iconCode,
//   };
// }

// function parseDailyWeather({ daily }) {
//   return daily.time.map((time, index) => {
//     return {
//       timestamp: time * 1000,
//       iconCode: daily.weathercode[index],
//       maxtemp: Math.round(daily.temperature_2m_max[index]),
//       mintemp: Math.round(daily.temperature_2m_min[index]),
//     };
//   });
// }

// function transformSun(info) {
//   const date = new Date(info * 1000);
//   const timeString = date.toLocaleTimeString([], {
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//     hourCycle: "h12",
//   });
//   return timeString;
//   // console.log(timeString);
// }
