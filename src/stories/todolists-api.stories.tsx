import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API',
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8fc044d8-3f5e-469a-b681-136f15cb55d0'
    }
})

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        instance.get('todo-lists').then((response) => {
            console.log(response)
            setState(response.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React 1488'
        instance.post('todo-lists', {title}).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '5def9f88-61d1-4c05-b124-f17c73d04505'
        instance.delete(`todo-lists/${todolistId}`).then((res) => {
            setState(res.data)
        }).catch((err) => {
            setState(err)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])

    return <div>{JSON.stringify(state)}</div>
}