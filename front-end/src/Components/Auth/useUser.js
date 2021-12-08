import {useState} from 'react'
export const useToken=()=>{
    const [token,setTokenInternal]=useState(()=>{
        const token="Bearer " + localStorage.getItem("token")
        return token  
    })
    const setToken=newToken=>{
        const token="Bearer " + localStorage.setItem("token",newToken)
        setTokenInternal(token)
    }
    return [token,setToken]
}
