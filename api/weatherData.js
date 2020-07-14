const request = require("request");
const URLkeys = require("../config/keys");

const { baseURL, keys } = URLkeys;

const weatherAPI = (address, callback) => {
  const url = `${baseURL}${address}&appid=${keys}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Kindly Connect to internet");
    } else if (response.body.name === undefined) {
      callback("Kindly enter a valid search");
    } else {
      callback(undefined, {
        lat: response.body.coord.lat,
        lon: response.body.coord.lon,
        location: response.body.name,
        temp:
          (parseInt(response.body.main.temp) - 273.5).toFixed(2) + "°c",
      });
    }
  });
};

module.exports = weatherAPI;
