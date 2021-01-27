// Kelvin: units = s;
// Fahrenheit: units = f;

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ea5f807feac2f6583ffc3b262d325dba&query=${longitude},${latitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Conecte-se em uma rede de internet!')
        } else if (body.error) {
            callback('Coordenadas erradas!')
        } else {
            callback(undefined, 
                `Now the weather is ${body.current.weather_descriptions[0]} with a temperature of ${body.current.temperature} degrees, a feeling of ${body.current.feelslike} degrees and ${body.current.humidity}% of humidity :)`)
        }
    })
}

module.exports = forecast