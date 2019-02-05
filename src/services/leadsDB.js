import axios from 'axios'
const host = 'http://localhost:3000/leads'

export const getAll = (userId) => {
    return axios.get(`${host}/getAll/${userId}`)
    .then( userLeads => userLeads)
    .catch( err => err.response)
}

export const newLead = (userId, lead) => {
    console.log(lead)
    return axios.post(`${host}/newLead/${userId}`, lead, {})
    .then( leads => leads)
    .catch( err => err.response)
}