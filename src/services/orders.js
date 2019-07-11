import axios from 'axios'
// const url = 'http://localhost:3000/orders'
const url = 'https://crm-fss.herokuapp.com/orders'

export const updateOrder = (data, id) =>
    axios.post(`${url}/updateOrder/${id}`, data)
        .then(res => res)
        .catch(err => err)

export const newOrder = (data, id) =>
    axios.post(`${url}/newOrder/${id}`, data)
        .then(res => res)
        .catch(err => err)

export const allOrders = id => 
    axios.get(`${url}/allOrders/${id}`)
        .then(res => res)
        .catch(err => err)

export const delOrder = id => 
    axios.post(`${url}/removeOrder/${id}`)
        .then(res => res)
        .catch(err => err)