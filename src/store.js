import { configureStore } from '@reduxjs/toolkit';
import bookingsReducer from './features/bookingsSlice'
import servicesReducer from './features/servicesSlice'


export default configureStore({
  reducer: {
    bookings: bookingsReducer,
    services: servicesReducer
  }
});
