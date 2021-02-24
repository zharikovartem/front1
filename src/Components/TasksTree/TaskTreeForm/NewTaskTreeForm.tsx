import { Form, Field, FormikProps } from 'formik'
import React, { ReactNode, useState, useEffect } from 'react'
import { AntInput, AntSelect, AntTextArea, AntTimePicker } from '../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
import ProjectForm from './Project/ProjectForm'


const NewTaskTreeForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    const values: any = props.values
    const selectOptions = values.selectOptions
    const taskTypes = values.taskTypes 

    const [taskType, setTaskType] = useState(values.taskType)

    useEffect(() => {
        const values: any = props.values
        const taskTypes = values.task_type
        setTaskType(taskTypes)
    }, [props.values])

    const onSelectTaskType = (val: string) => {}
    
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            {taskType !== 3 ?
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />
            :
            null}

            <Field
                component={AntSelect}
                selectOptions={selectOptions}
                name="parent_id"
                type="select"
                label="Parent"
                submitCount={props.submitCount}
            />

            <Field
                component={AntTextArea}
                name="descriptions"
                type="textarea"
                label="Descriptions"
                submitCount={props.submitCount}
            />

            {taskType !== 3 ?
                <Field
                    component={AntTimePicker}
                    name="time_to_complete"
                    type="time"
                    label="Time to complete"
                    submitCount={props.submitCount}
                />
                :
                null
            }


            <Field
                component={AntSelect}
                selectOptions={taskTypes}
                name="task_type"
                type="select"
                label="task Types"
                onSelect = {onSelectTaskType}
                submitCount={props.submitCount}
            />


            {taskType === 2 ?
                <>
                    <Field
                        component={AntInput}
                        name="phone_number"
                        type="text"
                        label="Номер телефона"
                        validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                    />
                    <Field
                        component={AntInput}
                        name="lead_name"
                        type="text"
                        label="Имя абонента"
                        validate={validateRequired}
                        submitCount={props.submitCount}
                        hasFeedback
                    />
                </>
                :
                null
            }
            {
                taskType === 3 ?
                    <ProjectForm />
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
}
export default NewTaskTreeForm