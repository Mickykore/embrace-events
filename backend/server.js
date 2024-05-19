const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');


const app = express();

//middleware
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:3000'], 
        credentials: true
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.get('/', (req, res) => {
    res.send('Home page');
});
//routes
app.use('/api/payment', paymentRoute);



const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`server started on port ${port}`));
