import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './paymentSlice';
import ticketReducer from './ticketSlice';
import transactionReducer from './transactionSlice';

const store = configureStore({
    reducer: {
        payment: paymentReducer,
        tickets: ticketReducer,
        transactions: transactionReducer,
    },
});

export default store;
