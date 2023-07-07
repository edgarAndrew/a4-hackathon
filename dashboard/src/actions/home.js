import axios from "axios"
import '../axios'
import { studentURL,booksURL, lendingURL } from "../axios"

export const getHomeStats = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"HomeStatsRequest"
        })
        const {data:data1} = await axios.get(`${studentURL}/students/api/v1/student/count`)
        const {data:data2} = await axios.get(`${booksURL}/books/api/v1/book/count`)
        const {data:data3} = await axios.get(`${lendingURL}/lending/api/v2/count`)
        const {data:data4} = await axios.get(`${lendingURL}/lending/api/v2/graph`)
        
        const res = {...data1,...data2,...data3}
        
        dispatch({
            type:"HomeStatsSuccess",
            payload:res,
            payload1:data4
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"HomeStatsFailure",
            payload:error.response.data.msg
        })
    }    
}