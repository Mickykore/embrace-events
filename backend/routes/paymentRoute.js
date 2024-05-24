const {createPayment, verifyPayment} = require('../controllers/PaymentController');

const router = require('express').Router();


router.post('/createpayment', createPayment);
router.get('/verifypayment', verifyPayment);

module.exports = router;