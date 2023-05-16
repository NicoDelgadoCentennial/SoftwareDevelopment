//import packages
const express = require('express');
const morgan = require('morgan');

//App
const app = express();

//Morgan
app.use(morgan('tiny'));

//First route
app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

app.get('/test', (req, res) => {
    res.json({message: 'Test'})
})

//Start Server
app.listen('1337');