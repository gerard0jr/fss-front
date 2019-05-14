import axios from 'axios'
// const url = 'http://localhost:3000/auth'
// const url = 'https://crm-fss.herokuapp.com/auth'
const url = 'https://3.14.70.148/auth'

export const signup = user => 
    axios.post(`${url}/signup`, user, {})
    .then(res => res.data)
    .catch(err => err.response)

export const login = user => 
    axios.post(`${url}/login`, user, {withCredentials: true})
    .then(res => res.data)
    .catch(err => err.response)

export const logout = () => 
    axios.get(`${url}/logout`)
    .then(res => res.data)
    .catch(err => err.response)

export const actUser = (id,user) =>
    axios.post(`${url}/updateUser/${id}`, user, {})
    .then(res => res.data)
    .catch(err => err.response)