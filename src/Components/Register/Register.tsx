import { Formik } from 'formik'
import React, { useEffect } from 'react'
import RegisterForm from './RegisterForm'
import { RegisterPropsType } from './RegisterContainer'
import { propTypes } from 'react-bootstrap/esm/Image'
import { Redirect, Route, useHistory } from 'react-router-dom'

const initialValues = {
    // bookingClient: "",
    // bookingDate: moment(Date.now()),
    // bookingTime: moment(Date.now()),
    // selectOptions: ["Mark", "Bob", "Anthony"]
}

export type OwnRegisterPropsType = {}

const Register: React.FC<RegisterPropsType> = (props) => {
    let history = useHistory();
    useEffect( () => {
        console.log('useEffect in Register: ', props.isAuth)
        if(props.isAuth) {
            history.replace(props.appLocation+'toDoList')
        }
    }, [props.isAuth])
    const handleSubmit = (formProps: any) => {
        console.log(formProps)
        formProps.status = 'guest'
        props.register(formProps)
    }

    console.log('Register', props)
    return (
        <>
            <h1 className="mb-5 mx-auto">Register Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                render={RegisterForm}
            />
        </>
    )
}

export default Register