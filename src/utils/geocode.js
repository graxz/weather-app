const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaXNhZGRvcmFyZnJlaXRhcyIsImEiOiJja2luZTk4Z3AwNXlnMnlvNHp1OHh2eHB6In0.PK5iKR3-a-_UhxI5kxsdMg&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Conecte-se em uma rede de internet!')
        } else if (body.features.length === 0) {
            callback('Não existe nenhum lugar com esse nome...')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode