import React, { useState } from 'react'
import { isMobile } from "react-device-detect"
import { DatePicker, Form, Input, TimePicker, Select, Checkbox } from "antd"
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import moment from "moment"
import {
    List, InputItem, Checkbox as CheckboxMobile, TextareaItem, Picker,
    DatePicker as DatePickerMobile,
    LocaleProvider
} from 'antd-mobile'

const FormItem = Form.Item
const Option: React.FC<any> = Select.Option
const CheckboxItem = CheckboxMobile.CheckboxItem
const { TextArea } = Input;

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };


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
    // //console.log('field: ', field)
    // //console.log('form: ', form)

    // const [state, setState] = useState(0);

    // let timeValue = new Date().setTime(0)
    let fieldValue: null | String | number | Date = null

    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    // const onInputChange = ({ target: { value } }: any) => {
    const onInputChange = (value: any) => {
        console.log('onInputChange: ', value)
        // //console.log(field.name)
        if (value.target) {
            // console.log(value)
            form.setFieldValue(field.name, value.target.value)
        } else {
            console.log(field.name, ": ", value)
            if (type === 'time') {
                form.setFieldValue(field.name, moment(value.setSeconds(0)))//.from() )
                // fieldValue = value.setSeconds(0)
                console.log(props)
            } else if (Array.isArray(value)) {
                // добавтить проверуку на пустой массив
                form.setFieldValue(field.name, value[0])
            } else {
                form.setFieldValue(field.name, value)
                // fieldValue = value
            }
            // console.log('fieldValue: ', fieldValue)
        }

    }
    const onChange = (value: any) => {
        console.log(value)
        //console.log(field.name,'=',value)
        if (value.target.type === 'checkbox') {
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
                // <List>
                //     <AntComponent
                //         onBlur={onBlur}
                //         onChange={type ? onInputChange : onChange}
                //         mode={type === 'time' ? "time" : null}
                //         // value = {fieldValue}
                //         key={label}
                //         // type={type}
                //         title={label}
                //         locale={enUs}
                //         autoHeight
                //         className={type === 'text' ? 'pl-0' : null}
                //     >
                //         {/* {label} */}
                //         <List.Item
                //             className="pl-0"
                //         // arrow="horizontal"
                //         >
                //             {label}
                //         </List.Item>
                //     </AntComponent>
                // </List>
                <MobileComponent 
                    AntComponent={AntComponent}
                    onBlur = {onBlur}
                    type = {type}
                    onInputChange = {onInputChange}
                    onChange = {onChange}
                    label = {label}
                    selectOptions = {selectOptions}
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

// export const AntInput = !isMobile ? CreateAntField(Input) : <List>CreateAntField(InputItem)</List>
export const AntInput = !isMobile ? CreateAntField(Input) : CreateAntField(InputItem)

export const AntInputPassword = !isMobile ? CreateAntField(Input.Password) : CreateAntField(InputItem)

export const AntTimePicker = !isMobile ? CreateAntField(TimePicker) : CreateAntField(DatePickerMobile)
export const AntCheckbox = !isMobile ? CreateAntField(Checkbox) : CreateAntField(CheckboxItem)
// TextArea
export const AntTextArea = !isMobile ? CreateAntField(TextArea) : CreateAntField(TextareaItem)


const MobileComponent: React.FC<any> = (props) => {
    const [value, setValue] = useState(null)

    const onInputChange = (value: any) => {
        props.onInputChange(value)
        setValue(value)
    }

    let data
    if (props.selectOptions !== null && props.selectOptions !== undefined) {
        console.log(props.label, props.selectOptions)
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
    
    console.log(data)

    return (
        <List>
            <props.AntComponent
                onBlur={props.onBlur}
                onChange={props.type ? onInputChange : props.onChange}
                mode={props.type === 'time' ? "time" : null}
                value = {value}
                key={props.label}
                // type={type}
                title={props.label}
                locale={enUs}
                autoHeight
                className={props.type === 'text' ? 'pl-0' : null}
                data={data}
                cols={1}
            >
                {/* {label} */}
                <List.Item
                    className="pl-0"
                // arrow="horizontal"
                >
                    {props.label}
                </List.Item>
            </props.AntComponent>
        </List>
    )
}