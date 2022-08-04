import {TodoListType} from "../App";

type RemoveTodoListsAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}

type ActionType = RemoveTodoListsAT


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.todolistId)
        }
        default: {
            return state
        }
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListsAT => {
    return {
        type: "REMOVE-TODOLIST",
        todolistId: todolistId
    }
}