import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.86.33:3333'
})