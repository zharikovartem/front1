import { Formik } from 'formik'
import React, { useEffect } from 'react'
import RegisterForm from './RegisterForm'
import { RegisterPropsType } from './RegisterContainer'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'


export type OwnRegisterPropsType = {}

const Register: React.FC<RegisterPropsType> = (props) => {
    let history = useHistory();
    useEffect( () => {
        if(props.isAuth) {
            history.replace(props.appLocation+'toDoList')
        }
    }, [props.isAuth])

    useEffect(() => {
        if (props.authError) {
            message.error(props.authError)
        }
    }, [props.authError])
    
    const handleSubmit = (formProps: any) => {
        formProps.status = 'guest'
        props.register(formProps)
    }

    return (
        <>
            <h1 className="mb-5 mx-auto">Register Form</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                render={RegisterForm}
            />
        </>
    )
}

export default Register