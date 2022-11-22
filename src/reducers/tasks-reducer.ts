import {v1} from "uuid";
import {AddTodolistAC, RemoveTodolistAC, todoListId_1, todoListId_2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType,} from "../api/todolistApi";


export type TasksStateType = {
    [todoLostId: string]: Array<TaskType>
}

type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof AddTodolistAC> |
    ReturnType<typeof RemoveTodolistAC>

let initialState: TasksStateType = {
    [todoListId_1]: [
        {
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            todoListId: todoListId_1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {
            id: v1(),
            title: "JS",
            status: TaskStatuses.Completed,
            todoListId: todoListId_1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }
    ],
    [todoListId_2]: [
        {
            id: v1(),
            title: "Milk",
            status: TaskStatuses.Completed,
            todoListId: todoListId_2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {
            id: v1(),
            title: "Bread",
            status: TaskStatuses.Completed,
            todoListId: todoListId_2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }
    ]
}

const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.newTaskTitle,
                status: TaskStatuses.New,
                addedDate: '',
                todoListId: action.payload.todolistId,
                deadline: '',
                description: '',
                order: 0,
                startDate: '',
                priority: TaskPriorities.Low
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    status: action.payload.status
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {[action.todolistId]: [], ...state}
        }
        case 'REMOVE-TODOLIST': {
            const {[action.todolistId]: value, ...newValue} = state
            return newValue
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const addTaskAC = (newTaskTitle: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTaskTitle
        }
    } as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            status,
            todolistId,
        }
    } as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            taskId,
            newTitle,
            todolistId
        }
    } as const
}

export default tasksReducer