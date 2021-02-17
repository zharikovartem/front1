import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useEffect } from 'react'
import { AntInput, AntTextArea, AntTimePicker, AntDatePicker } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'


const ToDoForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    useEffect(() => {
        // props.values = props.initialValues
        console.log('useEffect ToDoForm values', props.values)
        // console.log('useEffect ToDoForm initialValues',props.initialValues)
        // const values: any = props.values
        // const taskTypes = values.task_type
    }, [props.values])
    console.log('ToDoForm render', props.values)
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