import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { FIRESTORE_DB, FIREBASE_STORAGE } from 'firebase-config';
import moment from 'moment';

interface Event {
  id: string;
  title: string;
  description: string;
  address: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  imageUrl: string;
}

interface EventsState {
  events: Event[];
  pastEvents: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  pastEvents: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'events'));
  const allEvents = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const eventData = doc.data() as Event;
      let imageUrl;
      try {
        imageUrl = await getDownloadURL(ref(FIREBASE_STORAGE, `events/${doc.id}`));
      } catch (error) {
        console.error(`Error fetching image for event ${doc.id}: `, error);
        imageUrl = 'https://via.placeholder.com/150'; // Default image URL
      }
      return { ...eventData, id: doc.id, imageUrl };
    })
  );

  const currentDate = moment();
  const upcomingEvents = allEvents.filter((event) => {
    const eventEndDate = moment(event.endDate, 'MM/DD/YYYY');
    return eventEndDate.isSameOrAfter(currentDate);
  });

  const pastEvents = allEvents.filter((event) => {
    const eventEndDate = moment(event.endDate, 'MM/DD/YYYY');
    return eventEndDate.isBefore(currentDate);
  });

  return { upcomingEvents, pastEvents };
});

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.upcomingEvents;
        state.pastEvents = action.payload.pastEvents;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export default eventsSlice.reducer;