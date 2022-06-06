import React, {useState} from 'react';
import {FilterType, TaskType} from "./App";


type PropsType = {
    title: string
    tasks: Array<TaskType>
    setTasks: (el: Array<TaskType>) => void
}

export function List(props: PropsType) {

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id: number) => {
        let stateTasks = props.tasks.filter((el) => el.id !== id)
        props.setTasks(stateTasks)

    }

    let filteredTasks = props.tasks

    if (filter === 'active') {
        filteredTasks = props.tasks.filter((el) => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = props.tasks.filter((el) => el.isDone)
    }

    /* switch (filter) {
         case "active":
             filteredTasks = props.tasks.filter((el) => !el.isDone)
             break;
         case "completed":
             filteredTasks = props.tasks.filter((el) => el.isDone)
             break;
         case "all":
             filteredTasks = props.tasks
             break;
         default:
             setFilter('all')
     }*/

    const filterBtn = (el: FilterType) => {
        setFilter(el)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {filteredTasks.map((el) => {

                const onClickBtnHandler = () => {
                    removeTask(el.id)
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
