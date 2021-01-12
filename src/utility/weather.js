const request = require("request");

const weather = (address, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(address.lat) +
    "&lon=" +
    encodeURIComponent(address.lon) +
    "&units=metric&appid=a6def324a68a897e7c133cec482e164e";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect...", undefined);
    } else {
      try {
        callback(undefined, {
          MinTemp: body.main.temp_min,
          MaxTemp: body.main.temp_max,
          humidity: body.main.humidity,
          clouds: body.weather[0].description,
          visibility: body.visibility,
        });
      } catch (error) {
        callback("Unable to find weather, try another location", undefined);
      }
    }
  });
};

module.exports = weather;
