import React, { useState, useEffect } from 'react'
import { DatePicker, Checkbox, Button } from 'antd'
import { FileAddOutlined, SettingOutlined } from '@ant-design/icons'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import {RangeValue} from '../../../Types/types'
import { ToDoHeaderPropsType } from './ToDoHeaderContainer'
import moment from 'moment'

const { RangePicker } = DatePicker

export type OwnToDoHeaderPropsType = {
    showDrawer: () => void,
    showModal: () => void,
    isOpen?: boolean
}

const ToDoHeader: React.FC<ToDoHeaderPropsType> = (props) => {
    const [isInterval, setIsInterval] = useState(false)
    const [dates, setDates] = useState<{startDate: moment.Moment, endDate: moment.Moment}>({startDate: moment(), endDate: moment()})

    useEffect(() => {
        if ( 
            !props.dateInterval.startDate.isSame(dates.startDate.format('YYYY-MM-DD'), "day" ) ||
            !props.dateInterval.endDate.isSame(dates.endDate.format('YYYY-MM-DD'), "day" )
        ) {
            props.setIsInterval(isInterval, dates)
        }
        
    }, [isInterval, dates, props])


    const onDateTypeChange = (e: CheckboxChangeEvent) => {
        if (!e.target.checked) {
            setDates({
                startDate: dates.startDate,
                endDate: dates.startDate
            })
        }
        setIsInterval(e.target.checked)
    }

    const onDateRangeChange = (values: RangeValue<moment.Moment>, formatString: [string, string]): void => {
        if (values !== null && values[0] !== null && values[1] !== null ) {
            setDates({
                startDate: values[0],
                endDate: values[1],
            })
        }
        
    }

    const onDateChange = (value: moment.Moment | null, dateString: string):void => {
        if (value !== null) {
            setDates({
                startDate: value,
                endDate: value,
            })
        }
    }

    return (
        <div className="row w-100" >
            <div className="col-12 col-md-9 col-lg-9 col-xl-7 w-100">
                <div className="d-none d-sm-inline">
                    <label >{isInterval ? "Date interval" : "Date"}:</label>
                </div>

                <div className="d-none d-inline">
                    {isInterval ?
                        <RangePicker
                            onChange={onDateRangeChange}
                            defaultValue={[props.dateInterval.startDate, props.dateInterval.endDate]}
                            value = {[props.dateInterval.startDate, props.dateInterval.endDate]}
                            format='DD-MM-YYYY'
                            style={{ marginLeft: 10 }}
                        />
                        :
                        <DatePicker
                            onChange={onDateChange}
                            defaultValue={props.dateInterval.startDate}
                            format='DD-MM-YYYY'
                            style={{ marginLeft: 10 }}
                        />
                    }
                </div>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-2 m-2 m-md-0" >
                <Checkbox className="ml-3" onChange={onDateTypeChange}>Date interval</Checkbox>
            </div>
            <div className="col-12 col-md-12 col-lg-4 col-xl-3 mt-lg-2">
                <Button
                    type="primary"
                    shape="round"
                    icon={
                        <div className="d-flex flex-wrap align-content-start">
                            <FileAddOutlined style={{ fontSize: '18px' }} />
                            <span className="ml-1" style={{ fontSize: '14px' }}>Add</span>
                        </div>}
                    style={{ marginLeft: 10 }}
                    onClick={props.showDrawer}
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