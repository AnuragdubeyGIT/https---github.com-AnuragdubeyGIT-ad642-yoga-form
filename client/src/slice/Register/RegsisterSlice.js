import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:3200/api";

const initialState = {
    details:null,
    isSuccess:false,
    isFail:false,
    isLoading:false,
    isPayment:false,
    message:''
}

export const registerForClass = createAsyncThunk('register-class',async (userData,thunkAPI) =>{
    try{
        console.log(userData);
        const response = await axios.post(`${API_URL}/register-user`,userData);
        return await response.data;
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const completePayment = createAsyncThunk('make-payment', async (paymentData,thunkAPI) =>{
    try{
        const response = await axios.post(`${API_URL}/payment`,paymentData);
        return await response.data;
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const registrationDetails = createAsyncThunk('registeration-details',async (userData,thunkAPI) =>{
    try{
        const response = await axios.post(`${API_URL}/register-details`,userData);
        return await response.data;
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const RegisterSlice = createSlice({
    name:'register-slice',
    initialState,
    reducers:{
        resetDetailsReset:(state) =>{
            state.isFail = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(registerForClass.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(registerForClass.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.details = action.payload
        })
        .addCase(registerForClass.rejected,(state,action) =>{
            state.isLoading = false
            state.isFail = true
            state.message = action.payload
        })


        .addCase(completePayment.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(completePayment.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isPayment = true
        })
        .addCase(completePayment.rejected,(state,action) =>{
            state.isLoading = false
            state.isFail = true
            state.message = action.payload
        })


        .addCase(registrationDetails.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(registrationDetails.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.details = action.payload
        })
        .addCase(registrationDetails.rejected,(state,action) =>{
            state.isLoading = false
            state.isFail = true
            state.message = action.payload
        })
    }
}) 


export const {resetDetailsReset} = RegisterSlice.actions;

export default RegisterSlice.reducer;