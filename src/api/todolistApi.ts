import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
})

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type baseResponseType<T = {}> = {
    data: T
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string;
    title: string;
    description: string;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    addedDate: string;
}
export type getTaskResponseType = {
    items: TaskType[];
    totalCount: number;
    error: string;
}
export type updateTaskRequestType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


export const TodolistApi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<baseResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<baseResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<baseResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<getTaskResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<baseResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todoListId: string, taskId: string, data: updateTaskRequestType) {
        return instance.put<baseResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, data)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<baseResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    }
}


