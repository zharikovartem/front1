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
        // return instance.post<any>(`tasks`, values)
        // .then(response => {
        //     return response.status === 200 ? response : null
        // })
        // .catch(err => {
        //     if (err.response) {
        //         return err.response
        //     } else if (err.request) {
        //         //console.log('request', err.request)
        //     } else {
        //         //console.log('anything else: ', err)
        //     }
        //     return null
        // })
        return instance.get<APIResponseType<MeResponseDataType>>(`authMe/me`).then( (response) => {
            //console.log(response)
            return response
        });
    },
}