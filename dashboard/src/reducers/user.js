import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated:false,
    profile:null
}
export const userReducer = createReducer(initialState,{
    
    // dispatch types or cases for reducer
    LoginRequest: (state,action)=>{
        state.loading = true;
    },
    LoginSuccess: (state,action)=>{
        state.loading = false;
        state.profile = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state,action)=>{
          state.loading = false;     
          state.error = action.payload
          state.isAuthenticated = false;
    },

    LoadUserRequest: (state,action)=>{
        state.loading = true;
    },
    LoadUserSuccess: (state,action)=>{
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = false;
    },

    LogoutUserRequest: (state,action)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state,action)=>{
        state.loading = false
        state.message = action.payload
        state.isAuthenticated = false;
    },
    LogoutUserFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
        state.isAuthenticated = true;
    },

    clearErrors:(state,action)=>{
        state.error = null
        state.message = null
    }
})
