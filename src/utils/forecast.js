const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = 'https://api.darksky.net/forecast/2e92b12ff6f5ce684eb2658cfe865dc3/'+ lat + ',' + long

    request({url, json: true}, (error, {body}) =>{
   
        if (error){
            callback('Unable to connect to weather service!')
        } else if (body.error){
            callback('Error in locaiton entered! ')
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
        }
    })
}

module.exports = forecast