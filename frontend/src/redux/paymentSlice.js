import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createPayment, verifyPayment } from '../services/paymentService';

export const createPaymentThunk = createAsyncThunk('payment/create', async (paymentData, { rejectWithValue }) => {
    try {
        return await createPayment(paymentData);
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const verifyPaymentThunk = createAsyncThunk('payment/verify', async (tx_ref, { rejectWithValue }) => {
    try {
        return await verifyPayment(tx_ref);
    } catch (error) {
        return rejectWithValue(error);
    }
});

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        payment: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPaymentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(createPaymentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyPaymentThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
            })
            .addCase(verifyPaymentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
