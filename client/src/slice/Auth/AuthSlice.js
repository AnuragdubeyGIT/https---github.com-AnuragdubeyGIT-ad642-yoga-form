import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from './AuthSerivces';

const user = localStorage.getItem('user');

let initialState = {
    user: user ? JSON.parse(user) : null,
    isRegister:false,
    isSuccess:false,
    isLoading:false,
    isError:false,
    message:''
}

export const login = createAsyncThunk('auth/login',async(userData,thunkAPI) => {
    try{
        return await AuthServices.login(userData);
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


export const register = createAsyncThunk('auth/register',async (userData,thunkAPI) =>{
    try{
        return await AuthServices.register(userData);
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const userDetails = createAsyncThunk('auth/user-details',async (userData,thunkAPI) =>{
    try{
        return await AuthServices.userDetails(userData);
    } catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const logout = createAsyncThunk('auth/logout',async (thunkAPI) =>{
    try{
        return await AuthServices.logout();
    } catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const authSlice = createSlice({
    name:'auth-slice',
    initialState,
    reducers:{
        reset:(state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(register.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(register.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.isRegister = true
            state.user = action.payload
        })
        .addCase(register.rejected,(state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(login.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(login.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected,(state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        
        .addCase(userDetails.pending,(state) =>{
            state.isLoading = true
        })
        .addCase(userDetails.fulfilled,(state,action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(userDetails.rejected,(state,action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        .addCase(logout.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(logout.fulfilled,(state) =>{
            state.isSuccess = true
            state.isLoading = false
            state.user = null;
        })
        .addCase(logout.rejected,(state) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = 'something wents worng!';
        })
    }
});


export const {reset} = authSlice.actions;

export default authSlice.reducer;