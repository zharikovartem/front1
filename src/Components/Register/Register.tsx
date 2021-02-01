import { Formik } from 'formik'
import React from 'react'
import RegisterForm from './RegisterForm'

const initialValues = {
    // bookingClient: "",
    // bookingDate: moment(Date.now()),
    // bookingTime: moment(Date.now()),
    // selectOptions: ["Mark", "Bob", "Anthony"]
}

const Register = () => {
    const handleSubmit = (formProps: any) => {

    }

    console.log('Register')
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