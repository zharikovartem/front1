import React from 'react'
import { DatePicker , List, InputItem } from 'antd-mobile'
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

// Компонент находится в разработке :-)
const NewTaskFormMobile = () => {
    return (
        <>
            <List
            // renderHeader={() => 'List Title'}
            >
                <InputItem
                    value=""
                    editable={true}
                >Task name</InputItem>
            </List>
            <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                <DatePicker
                    locale={enUs}
                    mode="date"
                    title="Date"
                    extra="click to choose"
                    value={new Date('2017-1-1')}
                    onChange={(date) => { console.log(date) }}
                >
                    <List.Item arrow="horizontal">Datetime</List.Item>
                </DatePicker>
            </List>
        </>
    )
}

export default NewTaskFormMobile