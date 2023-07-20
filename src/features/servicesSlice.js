import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {db, storage} from "../firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

//Async thunk for fetching services
export const fetchServices = createAsyncThunk(
    "services/fetchServices",
    async () => {
        try {
            const response = await fetch('https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/services')
            const data = await response.json();
            
            return data
        } catch(error){
            console.error(error);
            throw error;
        }
    }
)

//Async thunk for saving new services
export const saveServices = createAsyncThunk(
    "services/saveServices",
    async ({serviceName, serviceDescription, serviceDuration, servicePrice,serviceFile}) => {
        try {
            let imageURL = "";

            if (serviceFile !== null){
                const imageRef = ref(storage, `services/${serviceFile.name}`);
                const response = await uploadBytes(imageRef, serviceFile);
                imageURL = await getDownloadURL(response.ref);
                console.log("imageURL")
                console.log(imageURL)
            }

            const response = await axios.post('https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/saveServices', {
                serviceName, serviceDescription, serviceDuration, servicePrice, imageURL
            })

            const data = response.data;

            return data

        } catch(error){
            console.error(error)
            throw error;
        }
    }
)

//Async thunk to update service
export const updateServices = createAsyncThunk(
    "services/updateServices",
    async ({serviceName, serviceDescription, serviceDuration, servicePrice,serviceFile, imageurl, serviceId}) => {
        try {
            let imageURL = imageurl; //Loading existing imageURL. If file dont exist, remain the original imageURL

            if (serviceFile !== null){
                const imageRef = ref(storage, `services/${serviceFile.name}`);
                const response = await uploadBytes(imageRef, serviceFile);
                imageURL = await getDownloadURL(response.ref);
            }

            const response = await axios.put(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/updateServices/${serviceId}`, {
                serviceName, serviceDescription, serviceDuration, servicePrice, imageURL
            })

            const data = response.data;

            return data

        } catch(error){
            console.error(error)
            throw error;
        }
    }
)



//Async thunk to delete service
export const deleteServices = createAsyncThunk(
    "services/deleteServices",
    async(serviceId) => {
        try {
            console.log(serviceId)
            await axios.delete(`https://booking-system-api-chungmangjie200.sigma-school-full-stack.repl.co/deleteServices/${serviceId}`)
            
            return serviceId
        } catch(error){
            console.log(error)
        }
    }
) 



const servicesSlice = createSlice({
    name: 'services',
    initialState: {services: [], loading: true},
    extraReducers: (builder) => {
      builder
      .addCase(fetchServices.fulfilled, (state,action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(saveServices.fulfilled, (state, action) => {
        state.services = [...state.services, action.payload]
      })
      .addCase(updateServices.fulfilled, (state, action) => {
        //Find existing service, then change its array
        const updatedService = action.payload;

        const serviceIndex = state.services.findIndex(
            (service) => service.id === updatedService.id
        );

        if (serviceIndex !== -1) {
            state.services[serviceIndex] = updatedService;
        }
      })
      .addCase(deleteServices.fulfilled, (state,action) => {
        const serviceId = action.payload;

        const serviceIndex = state.services.findIndex(
            (service) => service.id === serviceId
        );

        if (serviceIndex !== -1) {
            state.services = state.services.filter((service) => service.id !== serviceId)
        }
      })
    }
  });

export default servicesSlice.reducer;