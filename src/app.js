const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Definindo pastas para a config do express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/parcials')

//Configurando handlebars e a localizacao de views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Configurando o diretorio para estatico (na url fica no final com .html, se carrega o arquivo nao dinamico)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Isaddora Freitas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Isaddora Freitas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Need help ?',
        name: 'Isaddora Freitas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Por favor insira um lugar válido'
        })
    } 
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        name: 'Isaddora Freitas',
        title: '404',
        errorMessage: 'HELP PAGE IS NOT FOUND'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        name: 'Isaddora Freitas',
        title: '404',
        errorMessage: 'PAGE NOT FOUND'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is up on http://localhost:${PORT}`)
})