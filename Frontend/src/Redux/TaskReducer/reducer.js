import React from 'react'
import { ADD_TASKS_FAILURE, ADD_TASKS_REQUEST, ADD_TASKS_SUCCESS,
     ADD_TASK_FAILURE, ADD_TASK_REQUEST, ADD_TASK_SUCCESS } from './actionTypes';

const initialState={
    tasks:[],
    isLoading:false,
    loading_msg:"",
    isError:false,
    err_msg:""
}

const reducer = (state=initialState,action) => {
    const {type,payload}=action;
     switch (type){
        case ADD_TASK_REQUEST:
            return {
                ...state,
                isLoading:true,
                loading_msg:payload
            }

        case ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks:[...state.tasks,payload],
                isLoading:false
            }

        case ADD_TASK_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
                err_msg:payload
            }
        
            case ADD_TASKS_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    loading_msg:payload
                }
    
            case ADD_TASKS_SUCCESS:
                console.log(payload)
                return {
                    ...state,
                    tasks:payload,
                    isLoading:false
                }
    
            case ADD_TASKS_FAILURE:
                return {
                    ...state,
                    isLoading:false,
                    isError:true,
                    err_msg:payload
                }
        default:
            return state
     }
}

export  {reducer}