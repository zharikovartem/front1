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

export const getToken = () => {
    if (localStorage.getItem('remember_token')) {
        instance.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('remember_token')
    }
    if (sessionStorage.getItem('remember_token')) {
        instance.defaults.headers.common['X-Auth-Token'] = sessionStorage.getItem('remember_token')
    }
}