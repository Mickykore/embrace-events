import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTransactions, getTransactionByTicketID, filterTransactions } from '../services/transactionServices';

export const getAllTransactionsThunk = createAsyncThunk('transactions/getAll', async () => {
    const response = await getAllTransactions();
    return response;
});

export const getTransactionByTicketIDThunk = createAsyncThunk('transactions/getByTicketID', async (tx_ref) => {
    const response = await getTransactionByTicketID(tx_ref);
    return response;
});

export const filterTransactionsThunk = createAsyncThunk('transactions/filter', async (filterParams) => {
    const response = await filterTransactions(filterParams);
    return response;
});

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        transaction: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTransactionsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTransactionsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(getAllTransactionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTransactionByTicketIDThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTransactionByTicketIDThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.transaction = action.payload;
            })
            .addCase(getTransactionByTicketIDThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(filterTransactionsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(filterTransactionsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(filterTransactionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default transactionSlice.reducer;
