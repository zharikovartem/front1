import React, {useState} from 'react'
import { Field } from 'formik'
import { AntSelect } from '../../../../utils/Formik/CreateAntField'
import { validateRequired } from '../../../../utils/Formik/ValidateFields'
import NewProjectForm from './NewProject/NewProjectForm'

const ProjectForm: React.FC<any> = (props) => {
    const [isNewType, setIsNewType] = useState<number>(0)
    const isNewTypeOptions = [
        {
            name: 'Old',
            value: 1
        },
        {
            name: 'New',
            value: 2
        },
        {
            name: 'Load From SRC',
            value: 3
        },
    ]

    const onSelect = (val: string) => {
        setIsNewType( Number(val) )
    }

    return(
        <>
            <Field
                component={AntSelect}
                selectOptions={isNewTypeOptions}
                name="isNewType"
                type="select"
                label="Вид проекта"
                submitCount={props.submitCount}
                validate={validateRequired}
                onSelect = {onSelect}
                onOk={ (val:any)=>{console.log('111', val)}}
            />
            {isNewType === 1 ? <div>old</div> : null}
            {isNewType === 2 ? <NewProjectForm {...props}/> : null}
            {isNewType === 3 ? <div>load</div> : null}
        </>
    )
}

export default ProjectForm