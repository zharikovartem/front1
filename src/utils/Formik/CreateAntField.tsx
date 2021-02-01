import React from 'react'
import { isMobile } from "react-device-detect"
import { DatePicker, Form, Input, TimePicker, Select, Checkbox } from "antd"
import { List, InputItem, Checkbox as CheckboxMobile } from 'antd-mobile'

const FormItem = Form.Item
const Option: React.FC<any> = Select.Option
const CheckboxItem = CheckboxMobile.CheckboxItem

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

    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;

    // const onInputChange = ({ target: { value } }: any) => {
    const onInputChange = (value: any) => {
        // //console.log(value.target.value)
        // //console.log(field.name)
        if (value.target) {
            form.setFieldValue(field.name, value.target.value)
        } else {
            form.setFieldValue(field.name, value)
        }
        
    }
    const onChange = (value: any) => {
        //console.log(value)
        //console.log(field.name,'=',value)
        if (value.target.type === 'checkbox') {
            form.setFieldValue(field.name, value.target.checked)
        } else {
            form.setFieldValue(field.name, value)
        }
    }
    const onBlur = () => form.setFieldTouched(field.name, true);
    return (
        <div >
            <FormItem
                label={!isMobile ? label : null}
                hasFeedback={
                    (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
                }
                help={submittedError || touchedError ? hasError : false}
                validateStatus={submittedError || touchedError ? "error" : "success"}
            >
                {isMobile ? 
                <List>
                    <AntComponent
                        onBlur={onBlur}
                        onChange={type ? onInputChange : onChange}
                    >
                        {label}
                    </AntComponent>
                </List>
                : 
                <AntComponent
                    {...field}
                    {...props}
                    onBlur={onBlur}
                    onChange={type ? onInputChange : onChange}
                >
                    {selectOptions &&
                        selectOptions.map((name: any) => <Option key={name}>{name}</Option>)}
                    
                    
                </AntComponent>
                }
                
            </FormItem>
        </div>
    )
}

export const AntSelect = !isMobile ? CreateAntField(Select) : CreateAntField(Select)
export const AntDatePicker = CreateAntField(DatePicker)

// export const AntInput = !isMobile ? CreateAntField(Input) : <List>CreateAntField(InputItem)</List>
export const AntInput = !isMobile ? CreateAntField(Input) : CreateAntField(InputItem)

export const AntInputPassword = !isMobile ? CreateAntField(Input.Password) : CreateAntField(InputItem)

export const AntTimePicker = CreateAntField(TimePicker)
export const AntCheckbox = !isMobile ? CreateAntField(Checkbox) : CreateAntField(CheckboxItem)