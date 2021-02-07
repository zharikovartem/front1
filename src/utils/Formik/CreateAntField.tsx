import React, { useState } from 'react'
import { isMobile } from "react-device-detect"
import {
    DatePicker,
    Form,
    Input,
    TimePicker,
    Select,
    Checkbox
} from "antd"
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import moment from "moment"
import {
    List,
    InputItem,
    Checkbox as CheckboxMobile,
    TextareaItem,
    Picker,
    DatePicker as DatePickerMobile,
} from 'antd-mobile'

const FormItem = Form.Item
const Option: React.FC<any> = Select.Option
const CheckboxItem = CheckboxMobile.CheckboxItem
const { TextArea } = Input;

const CreateAntField = (AntComponent: any) => (
    {
        field,
        form,
        hasFeedback,
        label,
        selectOptions,
        submitCount,
        type,
        ...props
    }: any
) => {

    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    // type OnInputChangeValueType = React.ChangeEvent<HTMLInputElement> | moment.Moment | Date | string
    // const onInputChange = (value: OnInputChangeValueType, field: any) => {
    const onInputChange = (value: any) => {
        console.log('value: ', value)
        console.log('field: ', field)
        console.log('type: ', type)
        if (value === undefined) {
            if (type == 'select' || type == 'time') {
                form.setFieldValue(field.name, null)
            }
        } else if(value === null) {
            form.setFieldValue(field.name, null)
        } else if (value.target) {
            form.setFieldValue(field.name, value.target.value)
        } else {
            if (type === 'time') {
                if (value instanceof moment) {
                    form.setFieldValue(field.name, value)
                } else {
                    form.setFieldValue(field.name, moment(value.setSeconds(0)))
                }
            } else if (Array.isArray(value)) {
                // добавтить проверуку на пустой массив
                form.setFieldValue(field.name, value[0])
            } else {
                form.setFieldValue(field.name, value)
            }
        }

    }

    const onChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
        console.log('onChange: ', value)
        if (typeof value !== "string" && value.target.type === 'checkbox') {
            form.setFieldValue(field.name, value.target.checked)
        } else {
            form.setFieldValue(field.name, value)
        }
    }

    const onBlur = () => form.setFieldTouched(field.name, true);

    return (
        <FormItem
            label={!isMobile ? label : null}
            hasFeedback={
                (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
            }
            help={submittedError || touchedError ? hasError : false}
            validateStatus={submittedError || touchedError ? "error" : "success"}
        >
            {isMobile ?
                <MobileComponent
                    AntComponent={AntComponent}
                    onBlur={onBlur}
                    type={type}
                    onInputChange={onInputChange}
                    onChange={onChange}
                    label={label}
                    selectOptions={selectOptions}
                />
                :
                <AntComponent
                    {...field}
                    {...props}
                    allowClear={selectOptions ? "true" : "false"}
                    onBlur={onBlur}
                    onChange={type ? onInputChange : onChange}
                >
                    {selectOptions &&
                        selectOptions.map((item: any) => <Option title={item.name} value={item.value} key={item.name}>{item.name}</Option>)}


                </AntComponent>
            }

        </FormItem>
    )
}

export const AntSelect = !isMobile ? CreateAntField(Select) : CreateAntField(Picker)
export const AntDatePicker = CreateAntField(DatePicker)
export const AntInput = !isMobile ? CreateAntField(Input) : CreateAntField(InputItem)
export const AntInputPassword = !isMobile ? CreateAntField(Input.Password) : CreateAntField(InputItem)
export const AntTimePicker = !isMobile ? CreateAntField(TimePicker) : CreateAntField(DatePickerMobile)
export const AntCheckbox = !isMobile ? CreateAntField(Checkbox) : CreateAntField(CheckboxItem)
export const AntTextArea = !isMobile ? CreateAntField(TextArea) : CreateAntField(TextareaItem)

type MobileComponentType = {
    onInputChange: (value: any) => void,
    selectOptions: Array<any>,
    AntComponent: any,
    onBlur: () => void,
    type: 'select' | 'date' | 'text' | 'number' | 'password' | 'time' | 'checkbox' | 'textarea',
    onChange: (value: any) => void,
    label: string,

}

// const MobileComponent: React.FC<any> = (props) => {
const MobileComponent: React.FC<MobileComponentType> = (props) => {
    const [value, setValue] = useState(null)

    const onInputChange = (value: any) => {
        props.onInputChange(value)
        setValue(value)
    }

    type DataType = Array<
        {
            label: string,
            value: string,
            key: string
        }
    >

    let data: DataType
    if (props.selectOptions !== null && props.selectOptions !== undefined) {
        data = props.selectOptions.map((item: any) => {
            return (
                {
                    label: item.name,
                    value: item.value,
                    key: item.name
                }
            )
        })
    } else {
        data = []
    }

    return (
        <List>
            <props.AntComponent
                onBlur={props.onBlur}
                onChange={props.type ? onInputChange : props.onChange}
                mode={props.type === 'time' ? "time" : null}
                value={value}
                key={props.label}
                title={props.label}
                locale={enUs}
                autoHeight
                className={props.type === 'text' ? 'pl-0' : null}
                data={data}
                cols={1}
            >
                <List.Item
                    className="pl-0"
                >
                    {props.label}
                </List.Item>
            </props.AntComponent>
        </List>
    )
}