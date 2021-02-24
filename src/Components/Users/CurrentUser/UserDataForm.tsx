import { Formik, FormikProps, Form, Field } from 'formik'
import React, { ReactNode, useState } from 'react'
import { AntInput, AntSelect } from '../../../utils/Formik/CreateAntField'
import { validateRequired, validatePhone } from '../../../utils/Formik/ValidateFields'

type userData = {
    userData: any,
    updateUser: (values: any, userId: number)=>void
}

const UserDataForm: React.FC<userData> = (props) => {

    type InitialFormValuesType = {
        id: number,
        created_at: string,
        updated_at: string,
        name: string,
        email: string,
        phone: string,
        status: string
    }
    const initialFormValues: InitialFormValuesType = {
        id: props.userData.id,
        created_at: props.userData.created_at,
        updated_at: props.userData.updated_at,
        name: props.userData.name,
        email: props.userData.email,
        phone: props.userData.phone,
        status: props.userData.status
    }

    const handleSubmit = (values: any, actions: any) => {
        delete values['created_at']
        delete values['updated_at']
        props.updateUser(values, props.userData.id)
    }


    return (
        <div>
            <Formik
                initialValues={initialFormValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {FormFielsd}
            </Formik>
        </div>
    )
}

export default UserDataForm

const FormFielsd: ((props: FormikProps<{}>) => ReactNode) = (props) => {

    const [isChanged, setIsChanged] = useState(false)

    const submitPosible = () => {
        setIsChanged(true)
    }

    const statusOptions = [
        {
            name: 'Guest',
            value: 'guest'
        },
        {
            name: 'Admin',
            value: 'admin'
        },
        {
            name: 'Super Admin',
            value: 'superAdmin'
        },

    ]

    return (
        <Form
            className="form-container mt-2"
            onSubmit={props.handleSubmit}
        >
            <Field
                component={AntInput}
                name="id"
                type="text"
                label="ID"
                disabled
                // submitCount={props.submitCount}
            />

            <Field
                component={AntInput}
                name="created_at"
                type="text"
                label="Created at"
                disabled
                // submitCount={props.submitCount}
            />

            <Field
                component={AntInput}
                name="updated_at"
                type="text"
                label="Updated at"
                disabled
                // submitCount={props.submitCount}
            />

            <Field
                component={AntInput}
                name="email"
                type="text"
                label="Email"
                disabled
                // validate={validateEmail}
                // onChange={submitPosible}
                // submitCount={props.submitCount}
                // hasFeedback
            />

            <Field
                component={AntInput}
                name="name"
                type="text"
                label="Name"
                validate={validateRequired}
                onChange={submitPosible}
                submitCount={props.submitCount}
                hasFeedback
            />
            
            <Field
                component={AntInput}
                name="phone"
                type="text"
                label="Phone number"
                validate={validatePhone}
                onChange={submitPosible}
                submitCount={props.submitCount}
                hasFeedback
            />
            <Field
                component={AntSelect}
                selectOptions={statusOptions}
                name="status"
                type="select"
                label="Status"
                validate={validateRequired}
                onChange={submitPosible}
                submitCount={props.submitCount}
            // hasFeedback
            />
            { isChanged ?
                <div className="submit-container">
                    <button className="ant-btn ant-btn-primary mb-4" type="submit">
                        Save
                    </button>
                </div>
                :
                null
            }
        </Form>
    )
}