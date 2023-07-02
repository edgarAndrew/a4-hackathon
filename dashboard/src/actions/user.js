import axios from "axios"
import '../axios'
import { studentURL } from "../axios"

export const login = (email,password)=>async(dispatch)=>{
    let cond = false
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data} = await axios.post(`${studentURL}/students/api/v1/auth/login/`,{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        if (data.user.isStudent) {
            cond = true;
            throw new Error("Students are not allowed access")
        }

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
    } catch (error) {
        if(cond){
            dispatch({
                type:"LoginFailure",
                payload:"Students are not allowed access"
            })

        }else{
            console.log(error.response.data,error.response.status)
            dispatch({
                type:"LoginFailure",
                payload:error.response.data.msg
            })
        }
    }    
}

export const loadUser = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest"
        })
        const {data} = await axios.get(`${studentURL}/students/api/v1/auth/verify-jwt`)
        dispatch({
            type:"LoadUserSuccess",
            payload:data.status,
            payload1:data.user
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
        const {data} = await axios.get(`${studentURL}/students/api/v1/auth/logout`)
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