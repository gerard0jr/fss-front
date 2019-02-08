import axios from 'axios'
const url = 'http://localhost:3000/auth'
const heroku = 'https://crm-fss.herokuapp.com/auth'

export const signup = user => 
    axios.post(`${heroku}/signup`, user, {})
    .then(res => res.data)
    .catch(err => err.response)

export const login = user => 
    axios.post(`${heroku}/login`, user, {withCredentials: true})
    .then(res => res.data)
    .catch(err => err.response)

export const actUser = (id,user) =>
    axios.post(`${heroku}/updateUser/${id}`, user, {})
    .then(res => res.data)
    .catch(err => err.response)