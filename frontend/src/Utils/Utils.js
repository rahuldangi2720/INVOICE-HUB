import axios from "axios"
const baseURL = process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000"
const API = axios.create({baseURL:baseURL})

export{axios,API,baseURL}