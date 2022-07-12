import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
// rsc
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    removeTodolist: (e: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
}

const List = (props: TodoListPropsType) => {
    const tasksJSX = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            const changeTaskTitle = (editedTitle: string) => {
                props.changeTaskTitle(t.id, editedTitle, props.id)
            }
            return (
                <li key={t.id} className={t.isDone ? "task isDone" : "task"}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={t.isDone}

                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>х</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id)
    }
    const onClickHandler = () => props.changeTodoListFilter("all", props.id)
    const addTask = (value: string) => {
        props.addTask(value, props.id)
    }
    const removeTodoist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
                <button onClick={removeTodoist}>Delete</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={onClickHandler}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={getOnClickHandler("active")}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={getOnClickHandler("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default List;