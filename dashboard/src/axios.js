import axios from "axios";

export const booksURL = "http://127.0.0.1:5000"
//export const booksURL = "https://library-books-api.vercel.app"
export const lendingURL = "http://127.0.0.1:5001"
//export const lendingURL = "https://library-lendings-api.vercel.app"
export const studentURL = "http://127.0.0.1:5002"
//export const studentURL = "https://library-students-api.vercel.app"

axios.defaults.withCredentials = true