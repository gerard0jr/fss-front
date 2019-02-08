import axios from 'axios'
const url = 'http://localhost:3000/leads'
const heroku = 'https://crm-fss.herokuapp.com/leads'

export const getAll = (userId) => {
    return axios.get(`${heroku}/getAll/${userId}`)
    .then( userLeads => userLeads)
    .catch( err => err.response)
}

export const newLead = (userId, lead) => {
    return axios.post(`${heroku}/newLead/${userId}`, lead, {})
    .then( leads => leads)
    .catch( err => err.response)
}

export const removeLead = leadID => {
    const { id } = leadID
    return axios.post(`${heroku}/removeLead/${id}`)
    .then(inactiveLead => inactiveLead)
    .catch(err => err.response)
}

export const removeUserLead = (userID, leadID) => {
    return axios.post(`${heroku}/removeUserLead/${userID}`, leadID)
    .then(newUser => newUser)
    .catch(err => err.response)
}

export const actLead = (id, lead) => {
    return axios.post(`${heroku}/updateLead/${id}`, lead)
    .then(updatedUser => updatedUser)
    .catch(err => err.response)
}