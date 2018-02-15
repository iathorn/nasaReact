import axios from 'axios';

export function getAPOD(date = ''){
    return axios.get(`https://api.nasa.gov/planetary/apod?api_key=3bPNuswHLRHGCeGrh7x0Jhn8Fb6me7NvEqvqjzu8&date=${date}`);
}