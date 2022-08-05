import {TodoListType} from "../App";
import {v1} from "uuid";


type AddTodoListsAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type ActionType = ReturnType<typeof removeTodoListAC> | AddTodoListsAT


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
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