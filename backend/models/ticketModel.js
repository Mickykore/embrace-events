const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    standardAmount: {
        type: Number,
        required: true
    },
    vipAmount: {
        type: Number,
        required: true
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;