import React from 'react'
import { Form, Field } from "formik"
import { AntInput, AntCheckbox, AntInputPassword } from '../../utils/Formik/CreateAntField'
import { List, Checkbox } from 'antd-mobile'
import { validateAsync, validateEmail, validateRequired, validateUserExistense } from '../../utils/Formik/ValidateFields'

const CheckboxItem = Checkbox.CheckboxItem

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

type OwnLoginFormPropsType = {
    handleSubmit: () => void,
    values: any,
    submitCount: any
}

const LoginForm: React.FC<OwnLoginFormPropsType> = (props) => {
    return (
        <Form 
            // {...layout} 
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
                // label={<label className="ant-form-item-required">Password</label>}
                validate={validateRequired}
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