import axios from 'axios'
const url = 'http://localhost:3000/bills'
// const url = 'https://crm-fss.herokuapp.com/bills'

export const updateBill = (data, id) =>
    axios.post(`${url}/updateBill/${id}`, data)
        .then(res => res)
        .catch(err => err)

export const newBill = (data, id) =>
    axios.post(`${url}/newBill/${id}`, data)
        .then(res => res)
        .catch(err => err)

export const allBills = id => 
    axios.get(`${url}/allBills/${id}`)
        .then(res => res)
        .catch(err => err)

export const delBill = id => 
    axios.post(`${url}/removeBill/${id}`)
        .then(res => res)
        .catch(err => err)