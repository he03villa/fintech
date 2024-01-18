import axios from 'axios'

const apiMarke = axios.create({
    baseURL: 'http://localhost:8092/api'
});

export default apiMarke;