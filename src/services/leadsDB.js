import axios from 'axios'
// const url = 'http://localhost:3000/leads'
const url = 'https://crm-fss.herokuapp.com/leads'
// const url = 'http://3.14.70.148/leads'

export const getAll = userId => 
    axios.get(`${url}/getAll/${userId}`)
        .then( userLeads => userLeads)
        .catch( err => err.response)

export const newLead = (userId, lead) => 
    axios.post(`${url}/newLead/${userId}`, lead, {})
        .then( leads => leads)
        .catch( err => err.response)

export const removeLead = leadID => {
    const { id } = leadID
    return axios.post(`${url}/removeLead/${id}`)
        .then(inactiveLead => inactiveLead)
        .catch(err => err.response)
}

export const removeUserLead = (userID, leadID) => 
    axios.post(`${url}/removeUserLead/${userID}`, leadID)
        .then(newUser => newUser)
        .catch(err => err.response)

export const actLead = (id, lead) => 
    axios.post(`${url}/updateLead/${id}`, lead)
        .then(updatedLead => updatedLead)
        .catch(err => err.response)

// Manejo de archivos

export const file0Upload = (link, id, name) => {
    const data = {link, name}
    return axios.post(`${url}/file0Upload/${id}`, data)
        .then(updatedLead => updatedLead)
        .catch(err => err.response)
}

export const file1Upload = (link, id, name) => {
    const data = {link,name}
    return axios.post(`${url}/file1Upload/${id}`, data)
        .then(updatedLead => updatedLead)
        .catch(err => err.response)
}

export const deleteFile0 = id => 
    axios.get(`${url}/deleteFile0/${id}`)
        .then(updatedLead => updatedLead)
        .catch(err => err.response)

export const deleteFile1 = id => 
    axios.get(`${url}/deleteFile1/${id}`)
        .then(updatedLead => updatedLead)
        .catch(err => err.response)