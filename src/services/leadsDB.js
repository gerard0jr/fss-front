import axios from 'axios'
// const url = 'http://localhost:3000/leads'
const url = 'https://crm-fss.herokuapp.com/leads'

export const getAll = userId => {
    return axios.get(`${url}/getAll/${userId}`)
    .then( userLeads => userLeads)
    .catch( err => err.response)
}

export const newLead = (userId, lead) => {
    return axios.post(`${url}/newLead/${userId}`, lead, {})
    .then( leads => leads)
    .catch( err => err.response)
}

export const removeLead = leadID => {
    const { id } = leadID
    return axios.post(`${url}/removeLead/${id}`)
    .then(inactiveLead => inactiveLead)
    .catch(err => err.response)
}

export const removeUserLead = (userID, leadID) => {
    return axios.post(`${url}/removeUserLead/${userID}`, leadID)
    .then(newUser => newUser)
    .catch(err => err.response)
}

export const actLead = (id, lead) => {
    return axios.post(`${url}/updateLead/${id}`, lead)
    .then(updatedUser => updatedUser)
    .catch(err => err.response)
}