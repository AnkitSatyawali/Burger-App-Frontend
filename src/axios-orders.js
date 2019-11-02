import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerapp-backend.herokuapp.com'
});

export default instance;