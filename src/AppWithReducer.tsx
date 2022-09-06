import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import tasksReducer, {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType
} from "./reducers/tasks-reducer";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [todoLostId: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducer() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoList] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })
    const removeTask = (taskID: string, todoListId: string) => {
        dispatchTasks(removeTaskAC(taskID, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todoListId))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskID, title, todoListId))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodoList(ChangeTodoListFilterAC(filter, todoListId))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchTodoList(ChangeTodolistTitleAC(title, todoListId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatchTodoList(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchTasks(action)
        dispatchTodoList(action)
    }

    //UI:
    const todoListsComponents = todoLists.map(el => {
        let tasksForRender;
        switch (el.filter) {
            case "active":
                tasksForRender = tasks[el.id].filter(t => !t.isDone)
                break
            case "completed":
                tasksForRender = tasks[el.id].filter(t => t.isDone)
                break
            default:
                tasksForRender = tasks[el.id]
        }
        return (
            <Grid item key={el.id}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <TodoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasksForRender}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                        removeTodolist={removeTodolist}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className={'App'}>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: 'space-between', backgroundColor: 'teal'}}>
                    <IconButton edge={"start"} color={"inherit"} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
