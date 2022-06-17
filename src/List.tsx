import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import classes from './List.module.css'
import {Checkbox} from "./components/CheckBox/Checkbox";
import {Simulate} from "react-dom/test-utils";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBox: (id: string, value: boolean) => void
    filter: string
}

export function List(props: PropsType) {
    //States
    const [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    // Buttons
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        }
        else {
            setError('Title is required!')
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    /*const onChangeCheckBoxHandler = (el: TaskType) => {
        props.changeCheckBox(el.id, !el.isDone)}*/
    const onRemoveHandler = (el: TaskType) => props.removeTask(el.id)


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? classes.error : ''} value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={classes.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(task => {
                    return <li className={task.isDone ? classes.isDone : ''} key={task.id}>
                        {/* <input type="checkbox" checked={task.isDone} onChange={() => onChangeCheckBoxHandler(task)}/>*/}
                        <Checkbox task={task} changeCheckBox={props.changeCheckBox}/>
                        <span>{task.title}</span>
                        <button onClick={() => onRemoveHandler(task)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? classes.activeFilter : ''} onClick={onAllClickHandler}>All
            </button>

            <button className={props.filter === 'active' ? classes.activeFilter : ''}
                    onClick={onActiveClickHandler}>Active
            </button>

            <button className={props.filter === 'completed' ? classes.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
