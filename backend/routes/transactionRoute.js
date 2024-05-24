const express = require('express');
const {
    getAllTransactions,
    getTransactionByTicketID,
    filterTransactions
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getAllTransactions);
router.get('/:tx_ref', getTransactionByTicketID);
router.get('/filter', filterTransactions);

module.exports = router;
