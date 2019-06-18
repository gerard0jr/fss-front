import axios from 'axios'

// const url = 'http://localhost:3000/general'
const url = 'https://crm-fss.herokuapp.com/general'
// const url = 'http://3.14.70.148/general'

export const getSellers = () => 
    axios.get(`${url}/getSellers`)
        .then(res => res)
        .catch(err => err)