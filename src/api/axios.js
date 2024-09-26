import axios from "axios";
const BASEURL = "http://localhost:3500"

export default axios.create({
    baseURL: BASEURL,
    withCredentials: true,
})

export const axiosPrivate = axios.create({
    baseURL: BASEURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})