import React, { ReactNode } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntCheckbox, AntInput, AntInputPassword, AntSelect } from '../../utils/Formik/CreateAntField'
import { validateEmail, validateRequired } from '../../utils/Formik/ValidateFields'

const RegisterForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return(
        <Form
            className="form-container" 
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntInput}
                name="email"
                type="email"
                label="Email"
                validate={validateEmail}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntInputPassword}
                name="password"
                type="password"
                label="Password"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />

            <Field
                component={AntInputPassword}
                name="c_password"
                type="password"
                label="Confirm"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />

            <Field
                component={AntCheckbox}
                name="remember"
                label="Remember Me"
                submitCount={props.submitCount}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Register
                </button>
            </div>

            {/* <Field
                component={AntCheckbox}
                name="asAdmin"
                label="As Admin"
                submitCount={props.submitCount}
            /> */}
            <Field
                component={AntSelect}
                selectOptions={statusOptions}
                name="status"
                type="select"
                label="User Status"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />

        </Form>
    )
}

export default RegisterForm

type StatusOptionItemType = {
    name: string,
    value: string,
    isSubform: boolean,
    // childTypes: []
}

type StatusOptionsType = Array<StatusOptionItemType>

const statusOptions: StatusOptionsType = [
    {
        name: 'Guest',
        value: 'guest',
        isSubform: false,
    },
    {
        name: 'Admin',
        value: 'admin',
        isSubform: false,
    },
]