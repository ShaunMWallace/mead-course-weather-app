const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/81cde14e072bcfb24290b9f30d86ca77/${longitude},${latitude}`;
  request({ url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service')
    } else if (response.body.error) {
        callback('Unable to find location');
        } else {
          const { currently, daily } = response.body
          const currentTemp = Math.round(currently.temperature);
          const currentRainChance = currently.precipProbability;
          const todaySummary = daily.data[0].summary;
          callback(undefined, {
            currentTemp,
            currentRainChance,
            todaySummary
          });
        }
      })
}

module.exports = forecast;