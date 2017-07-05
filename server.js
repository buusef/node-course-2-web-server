const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) console.log('Hey I am unable to log');
    } );
    next();
});

//app.use excutes in order, so if serving static files app.use if above the maintenance app.use, it is going to work anyway
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//__dirname stores the path to the project directory "node-web-server"
app.use(express.static(__dirname + '/public'));


//creating a varialble(helper) to be used in all templates
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


// Use first argument '/' as the root of the app
app.get('/', (req,res) => {
    res.render('home.hbs',{
        welcome: 'Welcome buddy',
        pageTitle: 'home page'
         
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
})

app.get('/bad', (req, res)=>{
    res.send({
        Error: true,
        ErrorMessage: 'Error buddy'
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});