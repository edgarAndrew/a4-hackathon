import axios from "axios"
import '../axios'
import { lendingURL } from "../axios"

export const login = (email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post(`${lendingURL}/lending/api/v1/auth/login/`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoginFailure",
            payload:error.response.data
        })
    }    
}

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get(`${lendingURL}/lending/api/v1/auth/verify-jwt`)
        dispatch({
            type:"LoadUserSuccess",
            payload:data
        })
    } catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LoadUserFailure",
            payload:error.response.data.detail
        })
    }    
}
export const logout = ()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LogoutUserRequest"
        })
        const {data} = await axios.get(`${lendingURL}/lending/api/v1/auth/logout`)
        dispatch({
            type:"LogoutUserSuccess",
            payload:"User Logged Out"
        })
    }catch (error) {
        console.log(error.response.data,error.response.status)
        dispatch({
            type:"LogoutUserFailure",
            payload:error.response.data
        })
    }    
    
}