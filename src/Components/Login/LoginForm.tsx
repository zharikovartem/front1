import React from 'react'
import { Form, Field, FormikProps } from "formik"
import { AntInput, AntCheckbox, AntInputPassword } from '../../utils/Formik/CreateAntField'
import { List, Checkbox } from 'antd-mobile'
import { validateAsync, validateEmail, validateRequired, validateUserExistense } from '../../utils/Formik/ValidateFields'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { LoginFormPropsType } from './LoginFormContainer'

const CheckboxItem = Checkbox.CheckboxItem

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

export type OwnLoginFormPropsType = {
    handleSubmit: () => void,
    values: any,
    submitCount: any
}

const LoginForm: any = (props: any) => {
    return (
        <Form 
            // {...layout} 
            className="form-container" 
            onSubmit={props.handleSubmit}
        >
            {/* <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            /> */}
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
                name="remember"
                label="Remember Me"
                submitCount={props.submitCount}
            />
            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Login
                </button>
            </div>
            <div className="mt-3">
                <Link to={"/register"}><Button type="link" block>Register</Button></Link>
            </div>
            
            

            {/* <List >
                <CheckboxItem key={"0"} onChange={onChange}>
                    test
                </CheckboxItem>
            </List> */}
        </Form>
    )
}

export default LoginForm

// const onChange = () => {
//     console.log('123')
// }