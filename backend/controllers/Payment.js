const mongoose = require('mongoose');
const TicketTransaction = require('../models/ticketTransactionModel'); // Import TicketTransaction model
const Ticket = require('../models/ticketModel');

const Chapa = require('chapa-nodejs').Chapa;

const chapa = new Chapa({
    secretKey: process.env.API_KEY,
});

const createPayment = async (req, res) => {
    const { ticketID, ticketType, email, phone, fname, lname, currency } = req.body;

    const chapa_tx_ref = await chapa.generateTransactionReference();
    const date = new Date().toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const time = new Date().toISOString().slice(11, 16).replace(":", ""); // Get HH:MM format (without seconds)
    const tx_ref = `${chapa_tx_ref}-${date}-${time}`;

    const publicUrl = 'https://embrace-events.onrender.com'; // Replace with your actual Localtunnel URL
    const callback_url = `${publicUrl}/api/payment/verifypayment`;
    const return_url = `${publicUrl}`;

    const amount = await Ticket.findOne({ _id: ticketID }).then((ticket) => {
        if (ticketType === 'standard') {
            return ticket.standardAmount;
        } else if (ticketType === 'vip') {
            return ticket.vipAmount;
        }
    });

    console.log("amount", amount);
    console.log(req.body)

    try {
        const response = await chapa.initialize({
            first_name: fname,
            last_name: lname,
            email: email,
            currency: currency,
            amount: amount,
            tx_ref: tx_ref,
            callback_url: callback_url,
            return_url: return_url,
            customization: {
                title: 'Test Title',
                description: 'Test Description',
            },
        });

        console.log("response", response);
        // Create TicketTransaction with pending status
        const ticketTransaction = new TicketTransaction({
            ticketID: ticketID,
            ticketType: ticketType,
            email: email,
            phone: phone,
            fname: fname,
            lname: lname,
            currency: currency,
            tx_ref: tx_ref,
            amount: amount,
            ticketNumber: generateTicketNumber(), // Generate random 5-digit ticket number
            status: 'pending'
        });

        await ticketTransaction.save();
        console.log(response);
        console.log("tx", ticketTransaction)

        res.status(200).json({ response, tx_ref });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

const verifyPayment = async (req, res) => {
    const { trx_ref} = req.body;
    console.log(req.body, trx_ref)

    try {
        const response = await chapa.verify({ tx_ref: trx_ref });

        // Update TicketTransaction status if payment is successful
        if (response.status === 'success') {
            await TicketTransaction.findOneAndUpdate({ tx_ref: trx_ref }, { status: 'paid' });
        }

        console.log(response);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Function to generate random 5-digit ticket number
function generateTicketNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}

module.exports = {
    createPayment,
    verifyPayment
};
