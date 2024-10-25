// eventsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id: string;
  description: string;
  address: string;
  imageUrl: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  latitude: number;
  longitude: number;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { addEvent, removeEvent, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
