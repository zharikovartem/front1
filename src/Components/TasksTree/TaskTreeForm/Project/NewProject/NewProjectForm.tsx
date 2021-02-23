import { Tooltip } from 'antd'
import { Field } from 'formik'
import React, { useState } from 'react'
import { AntCheckbox, AntInput } from '../../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../../utils/Formik/ValidateFields'

const NewProjectForm: React.FC<any> = (props) => {
    const [frontend, setFrontend] = useState(false)
    const [backend, setBackend] = useState(false)

    const submitFrontEnd = (val: any) => {
        setFrontend(val.target.checked)
    }

    const submitBackEnd = (val: any) => {
        setBackend(val.target.checked)
    }

    return (
        <>
            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Project Name"
                validate={validateRequired}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntCheckbox}
                name="isHasBackEnd"
                type="checkbox"
                label="BackEnd"
                submitCount={props.submitCount}
                onClick={submitBackEnd}
                onSelect={submitBackEnd}
            />
            {backend ? 
            <>
                <h5>backend initial options:</h5><br />
                <Field
                    component={AntCheckbox}
                    type="checkbox"
                    name="isCRA"
                    label="Choise Backend Type"
                    submitCount={props.submitCount}
                />
                </>
            :null}
            <Field
                component={AntCheckbox}
                name="isHasFrontEnd"
                type="checkbox"
                label="FrontEnd"
                submitCount={props.submitCount}
                onClick={submitFrontEnd}
                onSelect={submitFrontEnd}
            />
            {frontend ? <>
                <h5>Frontend initial options:</h5><br />
                <Field
                    component={AntCheckbox}
                    name="isCRA"
                    label="Create React App"
                    submitCount={props.submitCount}
                />
                <Field
                    component={AntCheckbox}
                    name="isTS"
                    label="Type Script"
                    submitCount={props.submitCount}
                />
                <Field
                    component={AntCheckbox}
                    name="isMenu"
                    label="Menu"
                    submitCount={props.submitCount}
                />
                <Field
                    component={AntCheckbox}
                    name="isRouter"
                    label="Router"
                    submitCount={props.submitCount}
                />
                <Field
                    component={AntCheckbox}
                    name="isLogin"
                    label="Login/ Register"
                    submitCount={props.submitCount}
                />
                <Field
                    component={AntCheckbox}
                    name="isBAM"
                    label={
                        <Tooltip title={<><p>Использование методологии БЭМ дваомтвщкмтущмшсвкумзкумз куцмзкцмозущкмзщк
                            зщсоуцшр сщрумщкуцмрщкму цршуцщмшрцщкушмщмкшцщш шомзущцкомзкумо зщумозщ3уом</p><p>Второй абзац</p></>}>
                            <span>БЭМ</span>
                        </Tooltip>
                }
                    submitCount={props.submitCount}
                />

            </> : null}
        </>
    )
}

export default NewProjectForm