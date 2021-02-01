import React from 'react'
import { Form, Field } from "formik"
import { AntCheckbox, AntInput, AntInputPassword } from '../../utils/Formik/CreateAntField'
import { validateEmail, validateRequired } from '../../utils/Formik/ValidateFields'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const RegisterForm: React.FC<any> = (props) => {
    console.log('RegisterForm')
    return(
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
                component={AntInputPassword}
                name="password2"
                type="password"
                label="Confirm"
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
                    Register
                </button>
            </div>
            
            

            {/* <List >
                <CheckboxItem key={"0"} onChange={onChange}>
                    test
                </CheckboxItem>
            </List> */}
        </Form>
    )
}

export default RegisterForm