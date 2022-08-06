import {FilterValuesType, TodoListType} from "../App";

type AddTodoListsAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type ActionType =
    ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListsAT
    | ReturnType<typeof changeTodoListFilterAC>


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
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

export const removeTodoListAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST" as const,
        todolistId: todolistId
    }
}

export const addTodoListAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListId
    } as const
}

export const changeTaskTitleAC = (title: string, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        title,
        todoListId
    }
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        filter,
        todoListId
    }
}