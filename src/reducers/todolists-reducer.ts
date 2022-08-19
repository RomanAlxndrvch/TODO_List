import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodoListFilterAC>


export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.todoListId ? {...el, title: action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.todoListId ? {...el, filter: action.filter} : el)
        }
        default: {
            return state
        }
    }
}

export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST" as const,
        todolistId: todolistId
    }
}

export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todolistId: v1()
    } as const
}

export const ChangeTaskTitleAC = (title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        title,
        todoListId
    }
}

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        filter,
        todoListId
    }
}