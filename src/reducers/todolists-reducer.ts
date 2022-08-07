import {FilterValuesType, TodoListType} from "../App";

type ActionType =
    ReturnType<typeof RemoveTodoListAC>
    | ReturnType<typeof ChangeTaskTitleAC>
    | ReturnType<typeof AddTodoListAC>
    | ReturnType<typeof ChangeTodoListFilterAC>


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

export const RemoveTodoListAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST" as const,
        todolistId: todolistId
    }
}

export const AddTodoListAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        todoListId
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