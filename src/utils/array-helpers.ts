import { TaskType } from "../Types/types";

export const sortTaskArrayByParams = (field: 'date' | 'time') => {
    if (field === 'date') {
        return (a: TaskType, b: TaskType) => a['date'] > b['date'] ? 1 : -1;
    } else {
        return (a: TaskType, b: TaskType) => a['time'] > b['time'] ? -1 : 1;
    }
}