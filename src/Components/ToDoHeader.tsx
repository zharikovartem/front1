import React, { useState } from 'react'
import { DatePicker, Checkbox, Button } from 'antd'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const ToDoHeader = (props: any) => {
    const [isGap, setIsGap] = useState(false)
    const [label, setLabel] = useState<'date' | 'interval'>('date')

    const onChange = (e: any) => {
        setIsGap(e.target.checked)
        if (e.target.checked) {
            setLabel('interval')
        } else {
            setLabel('date')
            console.log('1 date selected: ', props.selectedDate.format('YYYY-MM-DD'))
            props.getTaskList(props.selectedDate.format('YYYY-MM-DD'))
        }
    }

    return (
        <div className="row" >
            <div className="col-12 col-md-8 col-lg-6">
                {/* d-inline */}
                <div className="d-none d-sm-inline">
                    <label >Select {label}:</label>
                </div>

                <div className="d-inline">
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
                </div>
            </div>
            <div className="col-12 col-md-4 col-lg-2 m-2 m-md-0" >
                <Checkbox className="ml-3" onChange={onChange}>Date interval</Checkbox>
            </div>
            <div className="col-12 col-md-12 col-lg-4">
                <Button
                    type="primary"
                    shape="round"
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <FileAddOutlined style={{ fontSize: '18px' }} />
                            {/* d-none d-sm-inline */}
                            <span className="ml-1" style={{ fontSize: '14px' }}>Add</span>
                        </div>}
                    style={{ marginLeft: 10 }}
                    // size="small"
                    onClick={props.showDrawer}
                    disabled={props.isAddActive}
                />

                <Button className=""
                    type="primary"
                    shape="round"
                    style={{ marginLeft: 10 }}
                    onClick={props.showModal}
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <SettingOutlined style={{ fontSize: '18px' }} />
                            <span className="ml-1" style={{ fontSize: '14px' }}>Settings</span>
                        </div>} 
                    />
            </div>
        </div>
    )
}

export default ToDoHeader