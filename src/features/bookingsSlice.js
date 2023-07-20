import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk for fetching bookings of one specific user
export const fetchBookings = createAsyncThunk(
    "bookings/fetchBookings",
    async (userUid) => {
        try {
            const response = await axios.get(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/bookings/${userUid}`)
            const data = response.data;
            
            return data;
        } catch(error){
            console.error(error);
            throw error;
        }
    }
)

//Async thunk for fetching bookings of one specific user
export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async () => {
      try {
          const response = await axios.get(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/allBookings`)
          const data = response.data;
          
          return data;
      } catch(error){
          console.error(error);
          throw error;
      }
  }
)


//Async thunk for saving new bookings
export const saveBookings = createAsyncThunk(
    "bookings/saveBookings",
    async ({customerName, email, phoneNumber, date, time, serviceId, userId}) => {
        try {
            const response = await axios.post('https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/saveBookings', {
              customerName, email, phoneNumber, date, time, serviceId, userId
            })

            const data = response.data;

            return data;

        } catch(error){
            console.error(error)
            throw error;
        }
    }
)

//Async thunk to update booking
export const updateBookings = createAsyncThunk(
    "bookings/updateBookings",
    async ({customerName, email, phoneNumber, date, time, serviceId, bookingId, userUid}) => {
        try {
            const response = await axios.put(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/updateBookings/${bookingId}/${userUid}`, {
              customerName, email, phoneNumber, date, time, serviceId
            })

            const data = response.data;

            return data;

        } catch(error){
            console.error(error)
            throw error;
        }
    }
)


//Async thunk to approve bookings
export const approveBookings = createAsyncThunk(
    "bookings/approveBookings",
    async(bookingId) => {
      try{
        await axios.put(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/approveBookings/${bookingId}`)
      
        return bookingId;
      } catch(error){
        console.error(error)
        throw error;
      }
    }
)
  
//Async thunk to reject bookings
export const rejectBookings = createAsyncThunk(
  "bookings/rejectBookings",
  async(bookingId) => {
    try{
      await axios.put(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/rejectBookings/${bookingId}`)
    
      return bookingId;
    } catch(error){
      console.error(error)
      throw error;
    }
  }
)
  

//Async thunk to delete booking
export const deleteBookings = createAsyncThunk(
    "bookings/deleteBookings",
    async(bookingId) => {
        try {
            await axios.delete(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/deleteBookings/${bookingId}`)
            
            return bookingId;
        } catch(error){
            console.log(error)
        }
    }
) 



const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {bookings: [], loading: true},
    extraReducers: (builder) => {
      builder
      .addCase(fetchBookings.fulfilled, (state,action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBookings.fulfilled, (state,action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(saveBookings.fulfilled, (state, action) => {
        state.bookings = [...state.bookings, action.payload]
      })
      .addCase(updateBookings.fulfilled, (state, action) => {
        const updatedBooking = action.payload;

        const bookingIndex = state.bookings.findIndex(
            (booking) => booking.id === updatedBooking.id
        );

        if (bookingIndex !== -1) {
            state.bookings[bookingIndex] = updatedBooking;
        }
      })
      .addCase(deleteBookings.fulfilled, (state,action) => {
        const bookingId = action.payload;

        const bookingIndex = state.bookings.findIndex(
            (booking) => booking.id === bookingId
        );

        if (bookingIndex !== -1) {
            state.bookings = state.bookings.filter((booking) => booking.id !== bookingId)
        }
      })
      .addCase(approveBookings.fulfilled, (state, action) => {
        const bookingId = action.payload;

        const bookingIndex = state.bookings.findIndex(
          (booking) => booking.id === bookingId
        );

        if(bookingIndex !== -1){
          // Change the approval_status of the approved booking to true
          state.bookings[bookingIndex].approval_status = true;
        }
      })
      .addCase(rejectBookings.fulfilled, (state,action) => {
        const bookingId = action.payload;

        const bookingIndex = state.bookings.findIndex(
            (booking) => booking.id === bookingId
        );

        if (bookingIndex !== -1) {
            // Change the approval_status of the rejected booking to false
            state.bookings[bookingIndex].approval_status = false;
        }
      })
    }
});

export default bookingsSlice.reducer;
