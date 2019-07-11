const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Desfine paths for express config
const publicDriectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locaion 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDriectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Ali Sheikh'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About me',
        name: 'Ali Sheikh'

    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        message: 'This is the help file being served dynamically ',
        name: 'Ali Sheikh'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must enter an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
    
        if (error){
            return res.send({error}) 
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error}) 
            }
    
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })
        })
    })
    
})


app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404-page', {
        title: '404',
        error: 'Help article note found',
        name: 'Ali Sheikh'
    })
})

app.get('*', (req,res) =>{
    res.render('404-page', {
        title: '404',
        error: 'Page not found.',
        name: 'Ali Sheikh'
    })
})

// app.com
//app.com/help
//app.com/about

app.listen(port, () =>{
    console.log('Server is up on port' + port)
})