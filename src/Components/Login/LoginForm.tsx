import React from 'react'
import { Form, Field } from "formik"
import { AntInput, AntCheckbox } from '../../utils/Formik/CreateAntField'
import { List, Checkbox } from 'antd-mobile'
import { validateAsync, validateEmail, validateUserExistense } from '../../utils/Formik/ValidateFields'

const CheckboxItem = Checkbox.CheckboxItem

type OwnLoginFormPropsType = {
    handleSubmit: () => void,
    values: any,
    submitCount: any
}

const LoginForm: React.FC<OwnLoginFormPropsType> = (props) => {
    return (
        <Form className="form-container" onSubmit={props.handleSubmit}>
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateUserExistense}
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
                component={AntCheckbox}
                name="rememberMe"
                // type="checkbox"
                label="Remember Me"
                // validate={validateEmail}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Submit
                </button>
            </div>

            {/* <List >
                <CheckboxItem key={"0"}>
                    test
                </CheckboxItem>
            </List> */}
        </Form>
    )
}

export default LoginForm