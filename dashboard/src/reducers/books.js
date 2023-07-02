import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const bookReducer = createReducer(initialState,{
    
    // dispatch types or cases for reducer
    GetAllBooksRequest: (state,action)=>{
        state.loading = true;
    },
    GetAllBooksSuccess: (state,action)=>{
        state.books = action.payload;
        state.loading = false;
    },
    GetAllBooksFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    GetBookRequest: (state,action)=>{
        state.loading = true;
    },
    GetBookSuccess: (state,action)=>{
        state.book = action.payload;
        state.loading = false;
    },
    GetBookFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },
    
    AddBookRequest: (state,action)=>{
        state.loading = true;
    },
    AddBookSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    AddBookFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    UpdateBookRequest: (state,action)=>{
        state.loading = true;
    },
    UpdateBookSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    UpdateBookFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    RemoveBookRequest: (state,action)=>{
        state.loading = true;
    },
    RemoveBookSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    RemoveBookFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    SearchBookRequest: (state,action)=>{
        state.loading = true;
    },
    SearchBookSuccess: (state,action)=>{
        state.books = action.payload;
        state.loading = false;
    },
    SearchBookFailure: (state,action)=>{
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
