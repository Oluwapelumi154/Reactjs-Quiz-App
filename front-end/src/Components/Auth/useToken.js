import {useState,useEffect} from 'react'
import {useToken} from '../Auth/useUser'
export const useUser=()=>{
    const [token]=useToken()
    const getPayloadfromToken=(token)=>{
        const encodedPayload=token.split('.')[1]
        return JSON.parse(atob(encodedPayload))
    }
    const [user,setUser]=useState(()=>{
        if(!token) return null;
        getPayloadfromToken(token)
    })
    useEffect(()=>{
        if(!token){
            setUser(null)
        }else{
           setUser(getPayloadfromToken(token)) 
        }
    },[token])
    return user;
}