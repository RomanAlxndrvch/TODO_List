import {FilterValuesType} from "../App";
import {v1} from "uuid";


type ActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodoListFilterAC>

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todoListId_1 = v1()
export const todoListId_2 = v1()

let initialState: Array<TodolistType> = [
    {id: todoListId_1, title: 'What to learn', filter: 'all'},
    {id: todoListId_2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
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

export const ChangeTodolistTitleAC = (title: string, todoListId: string) => {
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