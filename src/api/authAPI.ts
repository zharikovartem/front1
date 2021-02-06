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
        return instance.get(`authMe/`+localStorage.getItem('remember_token')).then( (response) => {
            //console.log('login: ', response)
            return response
        })
    },
    login(data: any) {
        return instance.post('login', data)
        .then(response => {
            //console.log('login: ', response)
            if (response.data.remember_token !== null) {
                localStorage.setItem('remember_token', response.data.remember_token);
            } else {
                localStorage.removeItem('remember_token');
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
            //console.log('login: ', response)
            if (response.data.remember_token !== null) {
                localStorage.setItem('remember_token', response.data.token);
            } else {
                localStorage.removeItem('remember_token');
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
    }
}