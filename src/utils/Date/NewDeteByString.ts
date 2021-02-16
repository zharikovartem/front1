

export const NewTimeByString = (dateValue?: string): Date => {
    const newDate = new Date()
    let dateParts: Array<string> = []
    if (dateValue) {
        dateParts = dateValue.split(':')
    }
    
    newDate.setHours(!dateParts[0] ? 0 : Number(dateParts[0]))
    newDate.setMinutes(!dateParts[1] ? 0 : Number(dateParts[1]))
    newDate.setSeconds(!dateParts[2] ? 0 : Number(dateParts[2]))
    newDate.setMilliseconds(!dateParts[3] ? 0 : Number(dateParts[3]))

    return newDate
}

export const NewDateByString = (dateValue?: string): Date => {
    const newDate = new Date()
    let dateParts: Array<string> = []
    if (dateValue) {
        dateParts = dateValue.split('-')
    }
    
    newDate.setFullYear(!dateParts[0] ? 0 : Number(dateParts[0]))
    newDate.setMonth(!dateParts[1] ? 0 : Number(dateParts[1]))
    newDate.setDate(!dateParts[2] ? 0 : Number(dateParts[2]))

    return newDate
}