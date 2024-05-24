import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } from '../services/ticketService';

export const createTicketThunk = createAsyncThunk('tickets/create', async (ticketData) => {
    const response = await createTicket(ticketData);
    return response;
});

export const getTicketsThunk = createAsyncThunk('tickets/getAll', async () => {
    const response = await getTickets();
    return response;
});

export const getTicketByIdThunk = createAsyncThunk('tickets/getById', async (id) => {
    const response = await getTicketById(id);
    return response;
});

export const updateTicketThunk = createAsyncThunk('tickets/update', async ({ id, ticketData }) => {
    const response = await updateTicket(id, ticketData);
    return response;
});

export const deleteTicketThunk = createAsyncThunk('tickets/delete', async (id) => {
    const response = await deleteTicket(id);
    return response;
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        ticket: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets.push(action.payload);
            })
            .addCase(createTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTicketsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTicketsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(getTicketsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTicketByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTicketByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.ticket = action.payload;
            })
            .addCase(getTicketByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateTicketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tickets.findIndex(ticket => ticket._id === action.payload._id);
                if (index !== -1) {
                    state.tickets[index] = action.payload;
                }
            })
            .addCase(updateTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteTicketThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTicketThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = state.tickets.filter(ticket => ticket._id !== action.payload._id);
            })
            .addCase(deleteTicketThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default ticketSlice.reducer;
