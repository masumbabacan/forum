import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import ToastMessage from "../utils/ToastMessage"

const initialState = {
    user: {},
    loading: false,
    error:false,
    msg:""
} 

export const signInUser = createAsyncThunk('signInUser', async (postData,{rejectWithValue}) => {
    try {
    const res = await axios.post('http://localhost:3000/api/forum/auth/login', postData,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    console.log("başarılı");
    return {resData:res.data,postData};
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const signUpUser = createAsyncThunk('signUpUser', async (postData,{rejectWithValue}) => {
    try {
    const res = await axios.post('http://localhost:3000/api/forum/auth/register', postData)
    return {resData:res.data,postData};
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        removeUser:(state,action)=>{
            state.user=""
            localStorage.removeItem('user')
        }
    },
    extraReducers:(builder)=> {
     builder.addCase(signUpUser.pending,(state,action)=>{
        state.loading=true
        state.error=""
     });
     builder.addCase(signUpUser.fulfilled,(state,action)=>{
        state.loading=false
        state.data=action.payload.postData;
        ToastMessage(action.payload.resData.msg,true);
        localStorage.setItem("user",JSON.stringify(action.payload.postData));
     });
     builder.addCase(signUpUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload.msg
        ToastMessage(action.payload.msg,false);
     });
     builder.addCase(signInUser.pending,(state,action)=>{
        state.loading=true
        state.error=""
     });
     builder.addCase(signInUser.fulfilled,(state,action)=>{
        state.loading=false
        state.data=action.payload.postData;
        ToastMessage(action.payload.resData.msg,true);
        localStorage.setItem("user",JSON.stringify(action.payload.postData));
     });
     builder.addCase(signInUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload.msg
        ToastMessage(action.payload.msg,false);
     });
    }
})
export const { addUser,removeUser } = authSlice.actions
export default authSlice.reducer