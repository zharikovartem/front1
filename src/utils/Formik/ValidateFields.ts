// import { userAPI } from "../../api/userAPI";

export const validateRequired = (value: string) => {
    let errors;
    if (!value) {
        errors = "Required!";
    }
    return errors;
}

export const validateEmail = (value: string) => {
    let errors;

    if (!value) {
        errors = "Required!";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errors = "Invalid email address!";
    }

    return errors;
};

export const validateAsync = (value: string) => {
    const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));
    return sleep().then(() => {
        if (['admin', 'null', 'god'].includes(value)) {
            return 'Nice try'
        }
    })
}

// export const validateUserExistense = (value: string) => {
//     //console.log(value)
//     return userAPI.checkUserForExistence(value).then( (result) => {
//         //console.log(result.status)
//         if (result.status !== 404) {
//             return 'Name is bisy'
//         } 
//     })
//     //console.log(test)

// }