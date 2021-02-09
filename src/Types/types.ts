import { AppStateType } from './../redux/store'

export type GetStateType = ()=>AppStateType

export type TaskListType = {
    created_at: string,
    deleted_at: string | null,
    descriptions: string | null,
    id: number,
    isCompleted: boolean,
    name: string,
    parent_id: null | number,
    task_type: string,
    time_to_complete: string,
    updated_at: string,
    user_id: number | null
} 

export type TaskType = {
    created_at: string,
    date: string,
    deleted_at: string | null,
    descriptions: string | null,
    id: number,
    name: string,
    order_id: number | null,
    todo_id: number | null,
    time: string,
    type: string | null,
    updated_at: string | null,
    user_id: number | null,
    isCompleted: number | null
}

export type NewTaskDataType = {
    name: string,
    user_id: number | undefined,
    taskTime: string,
    date: string
    description?: string
}

export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null
export declare type EventValue<DateType> = DateType | null