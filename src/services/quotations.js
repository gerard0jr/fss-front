import axios from 'axios'

const url = 'http://localhost:3000/quotations'
// const url = 'https://crm-fss.herokuapp.com/quotations'


export const getQuot = id =>
    axios.get(`${url}/getQuotations/${id}`)
        .then(res => res)
        .catch(err => err)

export const newQuot = (id, data) => 
    axios.post(`${url}/submitQuotation/${id}`, data)
        .then(res => res)
        .catch(err => err)

export const actQuot = (id,quot) => 
    axios.post(`${url}/updateQuot/${id}`, quot)
        .then(res => res)
        .catch(err => err)

export const delQuot = id => 
    axios.post(`${url}/delQuot/${id}`)
        .then(res => res)
        .catch(err => err)