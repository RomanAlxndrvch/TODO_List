import {v1} from "uuid";
import {TodolistType} from "../api/todolistApi";

type ActionType =
    ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodoListFilterAC>
export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const todoListId_1 = v1()
export const todoListId_2 = v1()

let initialState: Array<TodolistDomainType> = [
    {id: todoListId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [{id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0}, ...state]
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