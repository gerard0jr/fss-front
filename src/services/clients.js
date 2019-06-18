import axios from 'axios'
// const url = 'http://localhost:3000/clients'
const url = 'https://crm-fss.herokuapp.com/clients'
// const url = 'http://3.14.70.148/clients'

export const updateClient = data =>
    axios.post(`${url}/updateClient/${data._id}`, data)
        .then(res => res)
        .catch(err => err)

export const newClient = data =>
    axios.post(`${url}/newClient`, data)
        .then(res => res)
        .catch(err => err)

export const allClients = () => 
    axios.get(`${url}/allClients`)
        .then(res => res)
        .catch(err => err)

export const delClient = id => 
    axios.post(`${url}/deleteClient/${id}`)
        .then(res => res)
        .catch(err => err)