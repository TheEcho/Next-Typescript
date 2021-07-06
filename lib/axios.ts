/* eslint-disable no-undef */
import axios, { AxiosRequestConfig } from 'axios';

const nasaUrl: string = 'https://api.nasa.gov';
const dbUrl: string = 'http://localhost:3000/api';

const API = {
    nasa: axios.create({
        baseURL: nasaUrl
    }),
    db: axios.create({
        baseURL: dbUrl
    })
};

API.nasa.interceptors.request.use((config: AxiosRequestConfig) => {
    config.params = {
        api_key: process.env.NASA_API_KEY,
        ...config.params
    };
    return config;
});

export default API;
