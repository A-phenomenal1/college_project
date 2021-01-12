const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaW1tb3J0YWwyMCIsImEiOiJja2pxMmUyMDgxaGw2Mnl0ZjMxbjYxaHlwIn0.h9JQDZKySNLPw7m35lPZXQ&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect.....`, undefined);
    } else {
      try {
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      } catch (error) {
        callback("Unable to find location, Try another search", undefined);
      }
    }
  });
};

module.exports = geocode;
