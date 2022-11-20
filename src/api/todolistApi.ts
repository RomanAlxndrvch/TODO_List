import axios from "axios";
import {CreateTodolist} from "../stories/todolists-api.stories";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
})

export type todolistType = {
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


export const TodolistApi = {
    getTodolist() {
        return instance.get<Array<todolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<baseResponseType<{ item: todolistType }>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<baseResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<baseResponseType>(`todo-lists/${id}`, {title})
    }
}


