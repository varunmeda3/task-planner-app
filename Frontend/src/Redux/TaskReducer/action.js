import { ADD_TASKS_FAILURE, ADD_TASKS_REQUEST, ADD_TASKS_SUCCESS, ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS } from "./actionTypes"

export const addTaskRequest=(payload)=>{
    return {type:ADD_TASK_REQUEST,payload}
}

export const addTaskSuccess=(payload)=>{
    return {type:ADD_TASK_SUCCESS,payload}
}

export const addTaskFailure=(payload)=>{
    return {type:ADD_TASK_FAILURE,payload}
}

export const addTasksRequest=(payload)=>{
    return {type:ADD_TASKS_REQUEST,payload}
}

export const addTasksSuccess=(payload)=>{
    return {type:ADD_TASKS_SUCCESS,payload}
}

export const addTasksFailure=(payload)=>{
    return {type:ADD_TASKS_FAILURE,payload}
}