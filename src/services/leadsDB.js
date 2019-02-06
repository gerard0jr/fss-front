import axios from 'axios'
const host = 'http://localhost:3000/leads'

export const getAll = (userId) => {
    return axios.get(`${host}/getAll/${userId}`)
    .then( userLeads => userLeads)
    .catch( err => err.response)
}

export const newLead = (userId, lead) => {
    return axios.post(`${host}/newLead/${userId}`, lead, {})
    .then( leads => leads)
    .catch( err => err.response)
}

export const removeLead = leadID => {
    const { id } = leadID
    return axios.post(`${host}/removeLead/${id}`)
    .then(inactiveLead => inactiveLead)
    .catch(err => err.response)
}

export const removeUserLead = (userID, leadID) => {
    return axios.post(`${host}/removeUserLead/${userID}`, leadID)
    .then(newUser => newUser)
    .catch(err => err.response)
}

export const actLead = (id, lead) => {
    return axios.post(`${host}/updateLead/${id}`, lead)
    .then(updatedUser => updatedUser)
    .catch(err => err.response)
}