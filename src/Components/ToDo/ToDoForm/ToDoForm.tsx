import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode } from 'react'
import { AntInput, AntTextArea, AntTimePicker, AntDatePicker } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'


const ToDoForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
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
                component={AntDatePicker}
                name="date"
                type="date"
                label="Task date"
                validate={validateRequired}
                submitCount={props.submitCount}
            />

            <Field
                component={AntTimePicker}
                name="time"
                type="time"
                label="Task time"
                validate={validateRequired}
                submitCount={props.submitCount}
            />

            <Field
                component={AntTextArea}
                name="descriptions"
                type="text"
                label="Descriptions"
                submitCount={props.submitCount}
            />

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default ToDoForm