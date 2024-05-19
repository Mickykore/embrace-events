const express = require('express');
const router = express.Router();
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controllers/TicketController');

// Route to create a new ticket
router.post('/', createTicket);

// Route to get all tickets
router.get('/', getTickets);

// Route to get a single ticket by ID
router.get('/:id', getTicketById);

// Route to update a ticket by ID
router.put('/:id', updateTicket);

// Route to delete a ticket by ID
router.delete('/:id', deleteTicket);

module.exports = router;
