import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from './reducers/user'
import {bookReducer} from './reducers/books'
import {studentReducer} from './reducers/students'

const store = configureStore({
    reducer:{
        user:userReducer,
        book:bookReducer,
        student:studentReducer
    }
})
export default store