import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../utils/Formik/CreateAntField'
import { validateRequired } from '../../utils/Formik/ValidateFields'
import { Select } from 'antd';

const { Option }: any = Select;


const NewTaskTreeForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const values: any = props.values
    //console.log(values)
    const selectOptions = values.selectOptions
    const taskTypes = values.taskTypes // ++++++

    const [taskType, setTaskType] = useState(values.taskType)

    useEffect(() => {
        const values: any = props.values
        const taskTypes = values.task_type
        setTaskType(taskTypes)

        //console.log('useEffect NewTaskTreeForm', props.initialValues)
    }, [props.values])

    //console.log('NewTaskTreeForm props: ', props)

    // const handleSubmit = (formProps: any) => {
    //     //console.log('formProps in NewTaskTreeForm: ',formProps)
    //     props.handleSubmit(formProps)
    // }

    //console.log('NewTaskTreeForm', props)
    //console.log('NewTaskTreeForm render', values)

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
                component={AntSelect}

                selectOptions={selectOptions}

                name="parent_id"
                type="select"
                label="Parent"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />

            <Field
                component={AntTextArea}
                name="descriptions"
                type="text"
                label="Descriptions"
                // validate={validateRequired}
                submitCount={props.submitCount}
                // hasFeedback
            />

            <Field
                component={AntTimePicker}
                name="time_to_complete"
                type="time"
                label="Time to complete"
                // validate={validateRequired}
                submitCount={props.submitCount}
            // hasFeedback
            />

            <Field
                component={AntSelect}

                selectOptions={taskTypes}

                name="task_type"
                type="select"
                label="task Types"
                // validate={validateRequired}
                submitCount={props.submitCount}
                // hasFeedback
            />


            {taskType === 2 ?
                <>
                    <Field
                        component={AntInput}
                        name="context1"
                        type="text"
                        label="context1"
                        validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                    />
                    <Field
                        component={AntInput}
                        name="context2"
                        type="text"
                        label="context2"
                        validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                    />
                </>
                :
                null
            }

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
    // )
}
export default NewTaskTreeForm