import React, {useEffect, useState} from 'react'
import {TodolistApi} from "../api/todolistApi";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistApi.getTodolist().then((response) => {
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
        TodolistApi.createTodolist(title).then((res) => {
            setState(res.data.data.item)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '1c441aa1-d105-41ec-9560-15e45715f86c'
        TodolistApi.deleteTodolist(todolistId).then((res) => {
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
        const todolistId = 'd6969274-ba89-40bc-bcfd-5711c6ba22d7'
        const title = 'w88w'
        TodolistApi.updateTodolist(todolistId, title).then(res => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}