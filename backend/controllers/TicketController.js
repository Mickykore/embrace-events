const Ticket = require('../models/ticketModel');
const Joi = require('joi');

// Joi schema for ticket validation
const ticketSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    standardAmount: Joi.number().required(),
    vipAmount: Joi.number().required(),
});

// Create a new ticket
const createTicket = async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = ticketSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
    try {
        // Validate request body against Joi schema
        const { error } = ticketSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};
