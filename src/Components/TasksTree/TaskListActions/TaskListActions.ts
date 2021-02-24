export type FormPropsDataType = {
    task_type: number
    lead_name?: string,
    phone_number?: string
}
export const checkActionsType = (formPropsData: FormPropsDataType):any => {
    switch ( Number(formPropsData.task_type) ) {
        case 2:
            return {
                lead_name: formPropsData.lead_name,
                phone_number: formPropsData.phone_number
            }
    
        default:
            return null
    }
}