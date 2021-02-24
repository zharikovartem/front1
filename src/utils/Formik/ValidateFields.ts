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

export const validatePhone = (value: string) => {
    let errors;
    if (!value) {
        errors = "Required!";
    } else if (value.length === 1) {
        if ( !Number(value) ) {
            if (value !== '+') {
                errors = "NOT NUMBER!";
            }
        }
    } else if (value.length < 9) {
        if (!Number(value)) {
            errors = "NOT NUMBER!"
        } else {
            errors = "Phone number is short"
        }
    } else if (value.length === 9) {
        const prefix = value[0]+value[1]
        if (prefix !== '25' || '29' || '33' || '44') {
            errors = "Wrong prefix"
        }
    } else if (value.length < 12) {
        if (value[0] !== '+') {
            if (!Number(value)) {
                errors = "NOT NUMBER!"
            } else {
                errors = "Phone number is short!"
            }
        } else {
            if (!Number(value)) {
                errors = "NOT NUMBER!"
            } 
        }
    } else if (value.length === 13) {
        if (value[0] !== '+') {
            errors = "Phone number is too long!"
        }
    }else if (value.length > 13) {
        errors = "Phone number is too long!"
    }

    return errors;
}
