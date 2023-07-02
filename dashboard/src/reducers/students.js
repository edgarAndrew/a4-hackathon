import {createReducer} from "@reduxjs/toolkit"

const initialState = {}

export const studentReducer = createReducer(initialState,{
    
    // dispatch types or cases for reducer
    GetAllStudentsRequest: (state,action)=>{
        state.loading = true;
    },
    GetAllStudentsSuccess: (state,action)=>{
        state.students = action.payload;
        state.loading = false;
    },
    GetAllStudentsFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    GetStudentRequest: (state,action)=>{
        state.loading = true;
    },
    GetStudentSuccess: (state,action)=>{
        state.student = action.payload;
        state.loading = false;
    },
    GetStudentFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },
    
    AddStudentRequest: (state,action)=>{
        state.loading = true;
    },
    AddStudentSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    AddStudentFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    UpdateStudentRequest: (state,action)=>{
        state.loading = true;
    },
    UpdateStudentSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    UpdateStudentFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    RemoveStudentRequest: (state,action)=>{
        state.loading = true;
    },
    RemoveStudentSuccess: (state,action)=>{
        state.message = action.payload;
        state.loading = false;
    },
    RemoveStudentFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    SearchStudentRequest: (state,action)=>{
        state.loading = true;
    },
    SearchStudentSuccess: (state,action)=>{
        state.students = action.payload;
        state.loading = false;
    },
    SearchStudentFailure: (state,action)=>{
        state.loading = false;     
        state.error = action.payload
    },

    StudentBooksRequest: (state,action)=>{
        state.loading1 = true;
    },
    StudentBooksSuccess: (state,action)=>{
        state.books = action.payload;
        state.loading1 = false;
    },
    StudentBooksFailure: (state,action)=>{
        state.loading1 = false;     
        state.error = action.payload
    },

    clearErrors:(state,action)=>{
        state.error = null
    },
    clearMessages:(state,action)=>{
        state.message = null
    }
})
