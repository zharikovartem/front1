import React, { ReactNode } from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntInput, AntCheckbox, AntInputPassword } from '../../utils/Formik/CreateAntField'
import { validateEmail, validateRequired } from '../../utils/Formik/ValidateFields'

const LoginForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form 
            className="form-container" 
            onSubmit={props.handleSubmit}
        >
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
                component={AntCheckbox}
                name="remember"
                label="Remember Me"
                submitCount={props.submitCount}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Login
                </button>
            </div>
        </Form>
    )
}

export default LoginForm