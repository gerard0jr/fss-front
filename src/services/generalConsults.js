import axios from 'axios'

const url = 'http://localhost:3000/general'
// const url = 'https://crm-fss.herokuapp.com/general'

export const getSellers = () => 
    axios.get(`${url}/getSellers`)
        .then(res => res)
        .catch(err => err)