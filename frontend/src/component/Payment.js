import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentThunk, verifyPaymentThunk } from '../redux/paymentSlice';
import { getTicketsThunk } from '../redux/ticketSlice';
import ButtonLoading from './loader/ButtonLoader';
import { useLocation } from 'react-router-dom';

const PaymentComponent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { ticket } = location.state || {}; // Get ticket data from the state
    const { payment, verification, loading, error } = useSelector((state) => state.payment);
    const { tickets } = useSelector((state) => state.tickets);

    const [paymentData, setPaymentData] = useState({
        ticketID: ticket?._id || '',
        ticketType: '',
        email: '',
        phone: '',
        fname: '',
        lname: '',
        currency: 'ETB'
    });

    useEffect(() => {
        dispatch(getTicketsThunk());
    }, [dispatch]);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleCreatePayment = async () => {
        const result = await dispatch(createPaymentThunk(paymentData));
        if (createPaymentThunk.fulfilled.match(result)) {
            const checkoutUrl = result.payload.response.data.checkout_url;
            window.location.href = checkoutUrl; // Redirect to Chapa checkout page
        }
    };

    const handleVerifyPayment = () => {
        if (payment && payment.tx_ref) {
            dispatch(verifyPaymentThunk(payment.tx_ref));
        }
    };

    return (
        <div className="container">
            <h4 className="mb-1">Billing address</h4>
            <div className='col-md-7 col-lg-8'>
                <form className='input-group p-2 border border-0'>
                    <div className='row g-3 mt-0'>
                        <div className="mb-0">
                            <label htmlFor="ticketID" className="form-label">Ticket</label>
                            <select
                                className="form-control form-select"
                                name="ticketID"
                                onChange={handleChange}
                                value={paymentData.ticketID}
                                disabled={ticket}
                            >
                                {ticket && <option value={ticket._id}>{ticket.title}</option>}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="fname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fname"
                                placeholder="First Name"
                                onChange={handleChange}
                                value={paymentData.fname}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="lname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lname"
                                placeholder="Last Name"
                                onChange={handleChange}
                                value={paymentData.lname}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                value={paymentData.email}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                placeholder="0911111... or +25191111..."
                                onChange={handleChange}
                                value={paymentData.phone}
                            />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="ticketType" className="form-label">Ticket Type</label>
                            <select
                                className="form-select"
                                name="ticketType"
                                onChange={handleChange}
                                value={paymentData.ticketType}
                            >
                                <option value="">Select Ticket Type</option>
                                <option value="standard">Standard</option>
                                <option value="vip">VIP</option>
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="currency" className="form-label">Currency</label>
                            <select
                                className="form-select"
                                name="currency"
                                onChange={handleChange}
                                value={paymentData.currency}
                            >
                                <option value="ETB">ETB</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        {loading ? (
                            <ButtonLoading className="w-100 btn btn-primary btn-lg" type="submit" disabled>Loading...</ButtonLoading>
                        ) : (
                            <button className="w-100 btn btn-primary btn-lg" onClick={handleCreatePayment}>Continue to checkout</button>
                        )}
                    </div>
                </form>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {payment && (
                <div className="mt-3">
                    <h3>Payment Created</h3>
                    <p>Transaction Reference: {payment.tx_ref}</p>
                    <button className="btn btn-success" onClick={handleVerifyPayment}>Verify Payment</button>
                </div>
            )}
            {verification && (
                <div className="mt-3">
                    <h3>Payment Verification</h3>
                    <p>Status: {verification.status}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentComponent;
