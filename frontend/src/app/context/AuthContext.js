"use client"

import { createContext, useReducer } from "react"
import axios from "axios";
import { API, baseURL } from "@/Utils/Utils";

let initialState={}

if(typeof window !=="undefined")
{
    
    initialState=JSON.parse(localStorage.getItem("UserData"))||{
        token:"",
        userId:""
    }
}else{
    initialState={
        token:"",
        userId:""
    }
}

async function Usersignin(body) {
    try {
        const response=await API.post(`/auth/usersignin`,body)
        return response?.data
    } catch (error) {
        console.log(error);
        
    }
}

async function Usersignup(body) {
    try {
      const response=await API.post(`/auth/usersignup`,body)
      return response?.status;
    } catch (error) {
        console.log(error);
        
    }
}

async function getprofile(id) {
    try {
        const responce = await API.get(`/profile/getprofile/${id}`)
        return responce?.data
    } catch (error) {
        console.log(error);
    }
}

export const AuthContext=createContext();

function reducer(state,action){
    
    switch (action.type) {
        case "SIGN_IN":
          
            
        const singinState={...action.payload}
        localStorage.setItem("UserData",JSON.stringify(singinState));
        return singinState;

        case"SIGN_OUT":
        const signoutstate = {token:"",userId:""}
        localStorage.setItem("UserData",JSON.stringify(signoutstate));
            return signoutstate
        default:
            return state;
    }

}

export const AuthProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
  return (
   <AuthContext.Provider value={{AuthData:state,dispatch,Usersignin,Usersignup,getprofile}}>
        {children}
   </AuthContext.Provider>
  )
}
