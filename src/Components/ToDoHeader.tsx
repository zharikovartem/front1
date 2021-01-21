import React, { useState, useEffect } from 'react'
import { DatePicker, Button, Checkbox } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const ToDoHeader = (props: any) => {
    const [isGap, setIsGap] = useState(false)
    const [label, setLabel] = useState<'date'|'interval'>('date')

    const onChange = (e: any) => {
        setIsGap(e.target.checked)
        if (e.target.checked) {
            setLabel('interval')
        } else {
            setLabel('date')
        }
    }

    return (
        <>
            <label>Select {label}:</label>
            

            {isGap ?
                <RangePicker 
                    onChange={props.onGapDateChange}
                    defaultValue={[props.selectedDate, props.selectedDate]}
                    format='DD-MM-YYYY'
                    style={{ marginLeft: 10 }}
                />
                :
                <DatePicker
                    onChange={props.onDateChange}
                    defaultValue={props.selectedDate}
                    format='DD-MM-YYYY'
                    style={{ marginLeft: 10 }}
                />
            }
            <Checkbox className="ml-3" onChange={onChange}>Date interval</Checkbox>
            <Button
                type="primary"
                shape="round"
                icon={<FileAddOutlined />}
                style={{ marginLeft: 10 }}
                size="small"
                onClick={props.showDrawer}
                disabled={props.isAddActive}
            >
                Add
            </Button>

        </>
    )
}

export default ToDoHeader