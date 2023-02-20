import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodoListAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {AppDispatch, RootState} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type TasksActionsType = RemoveTaskActionType | ReturnType<typeof addTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTodoListAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.newTask.todoListId]: [{...action.newTask}, ...state[action.newTask.todoListId]]}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            let newState = {...state}
            action.todoLists.forEach(el => newState[el.id] = [])
            return newState
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]: [...action.tasks]
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...action.model} : el)
            }
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (newTask: TaskType) => {
    return {type: 'ADD-TASK', newTask} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todoListId
    } as const
}

export const updateTaskAC = (todoListId: string, taskId: string, model: TaskType) => {
    return {
        type: 'UPDATE-TASK',
        taskId,
        todoListId,
        model
    } as const
}

////////////////////////////////////////////////////////////

export const setTasksTC = (todoListId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.getTasks(todoListId).then(res => {
        dispatch(setTasksAC(res.data.items, todoListId))
    })
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: AppDispatch) => {
    todolistsAPI.deleteTask(todoListId, taskId).then(res => {
        res.data.resultCode === 0 && dispatch(removeTaskAC(taskId, todoListId))
    })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: AppDispatch) => {
    todolistsAPI.createTask(todoListId, title).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    })
}

export type updateModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoListId: string, taskId: string, model: updateModelType) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState()
    const task = state.tasks[todoListId].find(el => el.id === taskId)
    let updatedTask: UpdateTaskModelType
    if (task) {
        updatedTask = {...task, ...model}
        todolistsAPI.updateTask(todoListId, taskId, updatedTask).then(res => {
            dispatch(updateTaskAC(todoListId, taskId, res.data.data.item))
        })
    }
}