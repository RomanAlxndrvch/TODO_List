import React from 'react';
import {FilterType, TaskType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    setFilter: (e: FilterType) => void
}

export function List(props: PropsType) {

    const filterBtn = (el: FilterType) => {
        props.setFilter(el)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((el, index) => {

                const onClickBtnHandler = () => {
                    props.removeTask(el.id)
                }

                return (
                    <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title} </span>
                        <button onClick={onClickBtnHandler}>x</button>
                    </li>
                )
            })}

        </ul>
        <div>
            <button onClick={() => filterBtn('all')}>All</button>
            <button onClick={() => filterBtn('active')}>Active</button>
            <button onClick={() => filterBtn('completed')}>Completed</button>
        </div>
    </div>
}
