import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verifyPaymentThunk } from '../redux/paymentSlice';
import { getTransactionByTicketIDThunk } from '../redux/transactionSlice';
import ButtonLoading from './loader/ButtonLoader';

const PaymentSuccess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { search } = location;
    const query = new URLSearchParams(search);
    const tx_ref = query.get('tx_ref');
    const ticketID = query.get('ticketID');

    const { transaction, loading, error } = useSelector((state) => state.transactions);

    useEffect(() => {
        if (tx_ref && ticketID) {
            dispatch(verifyPaymentThunk({ tx_ref }));
            dispatch(getTransactionByTicketIDThunk(ticketID));
        }
    }, [dispatch, tx_ref, ticketID]);

    console.log('Transaction:', transaction);

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

    return (
        <div className="container">
            <h3>Payment Successful</h3>
            {transaction && (
                <div>
                    <p><strong>Transaction Reference:</strong> {transaction.tx_ref}</p>
                    <p><strong>Ticket Type:</strong> {transaction.ticketType}</p>
                    <p><strong>Amount Paid:</strong> {transaction.amount} {transaction.currency}</p>
                    <p><strong>Payer Name:</strong> {transaction.fname} {transaction.lname}</p>
                    <p><strong>Email:</strong> {transaction.email}</p>
                    <p><strong>Phone:</strong> {transaction.phone}</p>
                    <p><strong>Ticket Number:</strong> {transaction.ticketNumber}</p>
                    <button onClick={handlePrint} className="btn btn-primary">Print Ticket</button>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
