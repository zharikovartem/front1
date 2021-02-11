import {instance, APIResponseType} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
    // remember_token?: string,
    // user?: any
    // error?: boolean,
    // message?: string
}

export const authAPI = {
    me() {
        let remember_token: string | null = 'error'
        if (localStorage.getItem('remember_token')) {
            remember_token = localStorage.getItem('remember_token')
        }
        if (sessionStorage.getItem('remember_token')) {
            remember_token = sessionStorage.getItem('remember_token')
        }
        console.log(remember_token)
        return instance.get(`authMe/`+remember_token).then( (response) => {
            console.log('ME: ', response)
            return response
        })
    },
    login(data: any) {
        return instance.post('login', data)
        .then(response => {
            console.log('login: ', response)
            if (data.remember) {
                if (response.data.remember_token !== null) {
                    localStorage.setItem('remember_token', response.data.remember_token);
                } else {
                    localStorage.removeItem('remember_token');
                }
            } else {
                if (response.data.remember_token !== null) {
                    sessionStorage.setItem('remember_token', response.data.remember_token);
                } else {
                    sessionStorage.removeItem('remember_token');
                }
            }
            

            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                //console.log(err.response)
                return err.response
            } else if (err.request) {
                //console.log('request', err.request)
            } else {
                //console.log('anything else: ', err)
            }
            return null
        })
    },
    register(creds: any) {
        return instance.post('register', creds)
        .then(response => {
            console.log('login: ', response)
            if (response.data.remember_token !== null) {
                localStorage.setItem('remember_token', response.data.token);
            } else {
                localStorage.removeItem('remember_token');
            }
            return response.status === 200 ? response : null;
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
                return err.response
            } else if (err.request) {
                //console.log('request', err.request)
            } else {
                //console.log('anything else: ', err)
            }
            return null
        })
    }
}