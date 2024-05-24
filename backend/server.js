const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const paymentRoute = require('./routes/paymentRoute');
const ticketRoute = require('./routes/ticketRoute');
const transactionRoute = require('./routes/transactionRoute');


const app = express();

//middleware
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://embrace-events.vercel.app'], 
        credentials: true
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//routes
app.get('/', (req, res) => {
    res.send('Home page');
});
//routes
app.use('/api/payment', paymentRoute);
app.use('/api/tickets', ticketRoute);
app.use('/api/transactions', transactionRoute);



const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log('connected to databaseb');
    app.listen(port, () => console.log(`server started on port ${port}`));
}).catch(err => console.log(err));
