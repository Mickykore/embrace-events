import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyPaymentThunk } from '../redux/paymentSlice';
import { getTransactionByTicketIDThunk } from '../redux/transactionSlice';
import ButtonLoading from './loader/ButtonLoader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { search } = location;
    const query = new URLSearchParams(search);
    const tx_ref = query.get('tx_ref');
    const ticketID = query.get('ticketID');

    const { transaction, loading, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        if (tx_ref) {
            dispatch(getTransactionByTicketIDThunk(tx_ref));
        }
    }, [dispatch, tx_ref, ticketID]);

    console.log("tx_ref succ", tx_ref);
    console.log("ticketID succ", ticketID);

    if (transaction.length > 0) {
        console.log('Transaction:', transaction[0].email);
    }

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return <ButtonLoading />;
    }

    if (error) {
        console.log('Error object:', error);
        return (
            <div className="alert alert-danger">
                {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
        );
    }

    const transactionDetails = transaction[0];

    return (
        <div className="container">
            <h3 className="my-4">Payment Successful</h3>
            {transactionDetails && (
                <div className="ticket" id="ticket">
                    <div className="ticket-header">
                        <h4 className="ticket-title">Event Ticket</h4>
                    </div>
                    <div className="ticket-body">
                        <p><strong>Transaction Reference:</strong> {transactionDetails.tx_ref}</p>
                        <p><strong>Ticket Type:</strong> {transactionDetails.ticketType}</p>
                        <p><strong>Amount Paid:</strong> {transactionDetails.amount} {transactionDetails.currency}</p>
                        <p><strong>Payer Name:</strong> {transactionDetails.fname} {transactionDetails.lname}</p>
                        <p><strong>Email:</strong> {transactionDetails.email}</p>
                        <p><strong>Phone:</strong> {transactionDetails.phone}</p>
                        <p><strong>Ticket Number:</strong> {transactionDetails.ticketNumber}</p>
                    </div>
                    <div className="ticket-footer">
                        <button onClick={handlePrint} className="btn btn-primary">Print Ticket</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
