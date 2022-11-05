import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import ToastMessage from "../utils/ToastMessage"

const initialState = {
    user: false,
    loading: false,
    error:false,
    msg:"",
    status:"",
    test:true
} 

export const signInUser = createAsyncThunk('signInUser', async (postData,{rejectWithValue}) => {
    try {
    const res = await axios.post('http://localhost:3000/api/forum/auth/login', postData,{
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    // console.log("başarılı");
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
            // console.log(action)
            state.status=action.payload.status;
            state.user=action.payload.data;
            //state.loading=true;
        },
        removeUser:(state,action)=>{
            state.user=false
            
            // ToastMessage(action.payload.msg,true);
        },
        testF:(state,action)=>{
            state.test = false;
        }
    },
    extraReducers:(builder)=> {
     builder.addCase(signUpUser.pending,(state,action)=>{
        state.loading=true
        state.error=""
     });
     builder.addCase(signUpUser.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload.postData;
        ToastMessage(action.payload.resData.msg,true);
        //localStorage.setItem("user",JSON.stringify(action.payload.postData));
     });
     builder.addCase(signUpUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload.msg
        ToastMessage(action.payload.msg,false);
     });
     builder.addCase(signInUser.pending,(state,action)=>{
        state.loading=true
        state.error=""
        state.test=false
     });
     builder.addCase(signInUser.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload.postData;
        ToastMessage(action.payload.resData.msg,true);
        
        //localStorage.setItem("user",JSON.stringify(action.payload.postData));
     });
     builder.addCase(signInUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload.msg
        ToastMessage(action.payload.msg,false);
     });
    }
})
export const { addUser,removeUser,testF } = authSlice.actions
export default authSlice.reducer