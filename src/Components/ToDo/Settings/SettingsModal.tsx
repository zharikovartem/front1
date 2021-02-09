import React, { ReactNode, useState } from 'react'
import { Card, Modal } from 'antd'
import { SettingsModalPropsType } from './SettingsModalContainer'
import { Form, Field, FormikProps, Formik } from 'formik'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
import { AntInput, AntSelect, AntTextArea, AntTimePicker, AntDatePicker, AntCheckbox } from '../../../utils/Formik/CreateAntField'
import { List } from 'antd-mobile'

const zeroTime = new Date()
zeroTime.setHours(0)
zeroTime.setMinutes(0)
zeroTime.setSeconds(0)
zeroTime.setMilliseconds(0)

const maxTime = new Date()
maxTime.setHours(23)
maxTime.setMinutes(59)
maxTime.setSeconds(0)
maxTime.setMilliseconds(0)

const settingasInstanse: any = {
        timeScaleInrerval: false,
        completeInrerval: true,
        timeScaleSingle: true,
        completeSingle: true,
        timeStart: zeroTime,
        timeEnd: maxTime,
}

export type OwmSettingsModalPropsType = {
    isModalVisible: boolean,
    handleOk: () => void,
    handleCancel: () => void
}


const SettingsModal: React.FC< SettingsModalPropsType > = (props) => {
    const [settings, setSettings] = useState(props.viewSettings !== null ? props.viewSettings : settingasInstanse)

    const handleSubmit = (values: any) => {
        // console.log(values)
        props.changeSettings('ToDo', values)
        props.handleOk()
    }

    let settingsBlock: Array<any> = []

    for (const propName in settings.ToDo) {
        if (Object.prototype.hasOwnProperty.call(settings.ToDo, propName)) {
            const element = settings.ToDo[propName]
            // console.log(propName, element)
            // settingsBlock.push(<FormItem title={propName} data={element}/>)
        }
    }

    console.log('SettingsModal', props)

    return (
        <Modal
            title="Task display settings"
            visible={props.isModalVisible}
            // onOk={props.handleOk} 
            onOk={props.handleOk}
            onCancel={props.handleCancel}
        >
            <Formik
                initialValues={settingasInstanse}
                // initialValues={{}}
                onSubmit={handleSubmit}
                render={SettingsForm}
            />
        </Modal>
    )
}

export default SettingsModal


const SettingsForm: ((props: FormikProps<{}>) => ReactNode) = (props) => {
    return (
        <Form
            className="form-container"
            onSubmit={props.handleSubmit}
        >
            <List renderHeader={() => 'Single date settings'}>
                <Field
                    component={AntCheckbox}
                    name="timeScaleSingle"
                    label="is time scale visible"
                    submitCount={props.submitCount}
                />

                <Field
                    component={AntCheckbox}
                    name="completeSingle"
                    label="is complete visible"
                    submitCount={props.submitCount}
                />
            </List>

            <List renderHeader={() => 'Inrerval date settings'}>
                <Field
                    component={AntCheckbox}
                    name="timeScaleInrerval"
                    label="is time scale visible"
                    submitCount={props.submitCount}
                />

                <Field
                    component={AntCheckbox}
                    name="completeInrerval"
                    label="is complete visible"
                    submitCount={props.submitCount}
                />
            </List>
            <List renderHeader={() => 'Work day info'}>
                <Field
                    component={AntDatePicker}
                    name="timeStart"
                    type="time"
                    label="Start time"
                    validate={validateRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                />

                <Field
                    component={AntDatePicker}
                    name="timeEnd"
                    type="time"
                    label="End time"
                    validate={validateRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                />
            </List>

            <div className="submit-container">
                <button className="ant-btn ant-btn-primary" type="submit">
                    Save
                </button>
            </div>

        </Form>
    )
}


