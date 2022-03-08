const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
//Paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs'); //setting template engine as handlebars
app.set('views', viewsPath); //Setting views location
hbs.registerPartials(partialsPath) // Setting partials path

// Setting static directory to access files
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sravya From Index'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Anjani From about'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Sravya from help",
        message: 'This is a help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        });
    }
    
    geocode(req.query.address, (error, { latitude, longitude,location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })

});

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("error", {
        title: '404 Help',
        name: "Sravya from help error page",
        message: "Help article Not found"
    })
});

app.get('*', (req, res) => {
    res.render("error", {
        title: '404',
        name: "Sravya from error page",
        message: "Error ! Page Not found"
    })
});

app.listen(port, () => {
    console.log("Server is up and running on "+ port)
})