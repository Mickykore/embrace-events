const TicketTransaction = require('../models/ticketTransactionModel');

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TicketTransaction.find()
        .populate('ticketID', 'title')
        .sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ticketID
const getTransactionByTicketID = async (req, res) => {
    const { tx_ref } = req.params;
    console.log(tx_ref);
    try {
        const transaction = await TicketTransaction.find({ tx_ref });
        console.log(transaction);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter transactions by dates, ticketType, and name
const filterTransactions = async (req, res) => {
    const { startDate, endDate, ticketType, name } = req.query;

    let filter = {};

    if (startDate && endDate) {
        filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (ticketType) {
        filter.ticketType = ticketType;
    }

    if (name) {
        filter.$or = [
            { fname: new RegExp(name, 'i') },
            { lname: new RegExp(name, 'i') }
        ];
    }

    try {
        const transactions = await TicketTransaction.find(filter);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionByTicketID,
    filterTransactions
};
