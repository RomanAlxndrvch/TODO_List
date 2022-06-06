import React, {useState} from 'react';
import './App.css';
import {List} from './List';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    /*let tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]*/

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "TSX", isDone: false}
        ]
    )

    /* const [filter, setFilter] = useState<FilterType>('all')

     const removeTask = (id: number) => {
         let stateTasks = tasks.filter((el) => el.id !== id)
         setTask1(stateTasks)
     }

     let filteredTasks = tasks

     if (filter === 'active') {
         filteredTasks = tasks.filter((el) => !el.isDone)
     }
     if (filter === 'completed') {
         filteredTasks = tasks.filter((el) => el.isDone)
     }*/

    return (
        <div className="App">
            <List
                title="What to learn"
                tasks={tasks}
                setTasks={setTasks}
            />
        </div>
    );
}

export default App;
