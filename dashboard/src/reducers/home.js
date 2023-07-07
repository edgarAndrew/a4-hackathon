import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const homeReducer = createReducer(initialState,{

    HomeStatsRequest: (state,action)=>{
        state.loading = true;
    },
    HomeStatsSuccess: (state,action)=>{
        state.loading = false;
        state.stats = action.payload
        state.graph = action.payload1
    },
    HomeStatsFailure: (state,action)=>{
          state.loading = false;     
          state.error = action.payload
    },

    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessages:(state,action)=>{
        state.message = null
    }
})
