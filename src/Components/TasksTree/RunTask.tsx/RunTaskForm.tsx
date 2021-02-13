import { Button } from 'antd'
import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import ButtonVsIcon from '../../../utils/components/ButtonVsIcon'
import { AntDatePicker, AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'

const RunTaskFormCall: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntDatePicker}
                name="date"
                type="date"
                label="Select Date"
                validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />

            <Field
                component={AntTimePicker}
                name="time"
                type="time"
                label="Select time"
                validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />
            <button className="ant-btn ant-btn-primary ml-2">Add now</button>
            <button className="ant-btn ant-btn-primary ml-2">Auto add by context</button>

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}

export default RunTaskFormCall