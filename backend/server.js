const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');
const tiicketRoute = require('./routes/ticketRoute');


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
app.use('/api/tickets', tiicketRoute);



const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('connected to db');
    app.listen(port, () => console.log(`server started on port ${port}`));
}).catch(err => console.log(err));
