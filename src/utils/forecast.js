const request = require('request');

forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=83d5e5d6dfb94efc428083f19bf42123&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather services!")
        } else if (body.error) {
            callback("Error message: " + body.error.info)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " in " + body.location.name + ". It feels like " + body.current.feelslike + " outside");
        }
    });
}


module.exports = forecast