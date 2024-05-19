const mongoose = require('mongoose');

const ticketTransactionSchema = new mongoose.Schema({
    ticketID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    },
    ticketType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    tx_ref: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    ticketNumber: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    }
});

const TicketTransaction = mongoose.model('TicketTransaction', ticketTransactionSchema);

module.exports = TicketTransaction;