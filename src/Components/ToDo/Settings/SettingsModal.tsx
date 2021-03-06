import React, { ReactNode } from 'react'
import { Modal } from 'antd'
import { SettingsModalPropsType } from './SettingsModalContainer'
import { Form, Field, FormikProps, Formik } from 'formik'
import { validateRequired } from '../../../utils/Formik/ValidateFields'
import { AntTimePicker, AntCheckbox } from '../../../utils/Formik/CreateAntField'
import { List } from 'antd-mobile'
import moment from "moment"
import { isMobile } from 'react-device-detect'
import { NewTimeByString } from '../../../utils/Date/NewDeteByString'

const zeroTimeDate = NewTimeByString()
const zeroTimeMoment = moment(zeroTimeDate)

const maxTimeDate = NewTimeByString('23:00')
const maxTimeMoment = moment(maxTimeDate)

const settingasInstanse = {
        timeScaleInrerval: false,
        completeInrerval: true,
        timeScaleSingle: true,
        completeSingle: true,
        timeStart: isMobile ? zeroTimeDate : zeroTimeMoment,
        timeEnd: isMobile ? maxTimeDate : maxTimeMoment,
}

export type SettingasInstanseType = typeof settingasInstanse

export type OwmSettingsModalPropsType = {
    isModalVisible: boolean,
    handleOk: () => void,
    handleCancel: () => void
}

const getSettingsInstanseFromPros = (viewSettings: any) => {
    const timeStartParts = viewSettings.timeStart.split(':')
    const timeEndParts = viewSettings.timeEnd.split(':')

    return {
        ...viewSettings,
        timeStart: isMobile ? NewTimeByString(viewSettings.timeStart) : moment().hours(timeStartParts[0]).minutes(timeStartParts[1]).seconds(0).milliseconds(0),
        timeEnd: isMobile ? NewTimeByString(viewSettings.timeEnd) : moment().hours(timeEndParts[0]).minutes(timeEndParts[1]).seconds(0).milliseconds(0),
    }
}

const SettingsModal: React.FC<SettingsModalPropsType> = (props) => {
    const settings = props.viewSettings !== null ? getSettingsInstanseFromPros(props.viewSettings.ToDo) : settingasInstanse

    const handleSubmit = (values: SettingasInstanseType) => {
        props.changeSettings('ToDo', values)
        props.handleOk()
    }

    return (
        <Modal
            title="Task display settings"
            visible={props.isModalVisible}
            onOk={props.handleOk}
            onCancel={props.handleCancel}
        >
            <Formik
                initialValues={settings}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {SettingsForm}
            </Formik>
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
                    component={AntTimePicker}
                    name="timeStart"
                    type="time"
                    label="Start time"
                    validate={validateRequired}
                    submitCount={props.submitCount}
                    hasFeedback
                />

                <Field
                    component={AntTimePicker}
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


