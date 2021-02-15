import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://crmapiserver.h1n.ru/api/',
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
