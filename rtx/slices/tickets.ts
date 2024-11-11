import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebase-config';
import { RootState } from '../../app/store';
import { getCurrentUser } from './user';

interface Ticket {
  id: string;
  fullName: string | null;
  isComplete: boolean;
  message: string;
  selectedDate: string;
  selectedHospital: string;
  selectedTime: string;
  status: string;
  ticketNumber: string;
  type: string;
  userEmail: string;
  userUID: string;
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const ticketsCollection = collection(FIRESTORE_DB, 'ticketDonate');
  const ticketSnapshot = await getDocs(ticketsCollection);
  const ticketList = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ticket[];
  return ticketList;
});

export const fetchTicketsForCurrentUser = createAsyncThunk(
  'tickets/fetchTicketsForCurrentUser',
  async (_, { dispatch, getState }) => {
    await dispatch(getCurrentUser(FIREBASE_AUTH.currentUser?.uid || ''));
    const state = getState() as RootState;
    const { displayName, hospitalName } = state.user.user;

    const ticketsCollection = collection(FIRESTORE_DB, 'ticketDonate');
    const q = query(
      ticketsCollection,
      where('selectedHospital', '==', displayName || hospitalName)
    );
    const ticketSnapshot = await getDocs(q);
    const ticketList = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Ticket[];
    return ticketList;
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    deleteTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
    fetchAllTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(fetchTicketsForCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketsForCurrentUser.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.tickets = action.payload;
        state.loading = false;
      })
      .addCase(fetchTicketsForCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets for current user';
      });
  },
});

export const { addTicket, updateTicket, deleteTicket, fetchAllTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
