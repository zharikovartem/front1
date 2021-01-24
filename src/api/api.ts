import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://crmapiserver.h1n.ru/api/',
    // baseURL: 'https://81.90.181.175/api/',
    // headers:     {
    //     "API-KEY": "b1775b2f-c3a5-4509-8dc9-90b5629de7c3"
    // }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
