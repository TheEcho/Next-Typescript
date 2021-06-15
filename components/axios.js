/* eslint-disable no-undef */
import axios from 'axios';

const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=hv8zQ2duuo1r9SCUIHdY3xIktyPPDRUjotggqjZV';

const Axios = axios.create({
    baseURL: baseUrl
});

export default Axios;
