import React from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { ContentRoterPropsType } from './ContentRoterContainer'

export type OwnContentRoterPropsType = {

}

const ContentRoter = (props: ContentRoterPropsType) => {
    console.log('ContentRoter', props)
    return(
        <div>
            ContentRoter
        </div>
    )
}

export default ContentRoter