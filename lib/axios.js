/* eslint-disable no-undef */
import axios from 'axios';

const baseUrl = 'https://api.nasa.gov';

const Axios = axios.create({
    baseURL: baseUrl
});

Axios.interceptors.request.use(config => {
    config.params = {
        api_key: 'hv8zQ2duuo1r9SCUIHdY3xIktyPPDRUjotggqjZV',
        ...config.params
    };
    return config;
});

export default Axios;
