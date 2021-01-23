import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://81.90.181.175/api/',
    // headers:     {
    //     "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    // }
});
