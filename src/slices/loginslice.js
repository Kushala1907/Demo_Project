import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin=createAsyncThunk('login/userLogin',async(userCredObj,{rejectWithValue})=>{

    try{
        let res=await axios.post(`${process.env.REACT_APP_PATH}/user-api/login-user`,userCredObj)
        if(res.data.message=='Login successful'){
            //store token in local/session storage
            sessionStorage.setItem("token",res.data.token)
            return res.data;
        }
        else if(res.data.message=='Invalid password'){
            throw new Error(res.data.message)
        }
        else{
            
            throw new Error(res.data.error.details[0].message)
            
        }
        
    }
    catch(err){
        return rejectWithValue(err);
    }
});

export const loginSlice=createSlice({
    name:"login",
    initialState:{
        userObj:{},
        userLoginStatus:false,
        errorMessage:"",
        status:"idle"
    },
    reducers:{
        clearState:(state,action)=>{
            state.userObj={}
            state.userLoginStatus=false
            state.errorMessage=""
            state.status="idle"
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status="pending";
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.userObj=action.payload.user;
            state.userLoginStatus=true;
            state.errorMessage="";
            state.status="success";
            console.log("action",state.userObj)
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage=action.payload.message;
            state.userLoginStatus=false;
            state.status="failed";
        });
    }
})

export const {clearState}=loginSlice.actions;

export default loginSlice.reducer;