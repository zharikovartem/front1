import { Formik } from 'formik'
import React, { useEffect } from 'react'
import RegisterForm from './RegisterForm'
import { RegisterPropsType } from './RegisterContainer'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import { RegisterFormType } from '../../api/authAPI'


export type OwnRegisterPropsType = {}

const initialValues: RegisterFormType = {
    email: '',
    password: '',
    name: '',
    remember: false
}

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
    
    const handleSubmit = (formProps: RegisterFormType) => {
        props.register( {...formProps, status: 'guest'} )
    }

    return (
        <>
            <h1 className="mb-5 mx-auto">Register Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={RegisterForm as any}
            />
        </>
    )
}

export default Register