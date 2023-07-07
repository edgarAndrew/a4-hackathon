import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from './reducers/user'
import {bookReducer} from './reducers/books'
import {studentReducer} from './reducers/students'
import { homeReducer } from "./reducers/home"

const store = configureStore({
    reducer:{
        user:userReducer,
        home:homeReducer,
        book:bookReducer,
        student:studentReducer
    }
})
export default store