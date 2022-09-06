import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    TodolistType
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed"

function AppWithRedux() {

    let tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todoLists)

    const dispatch = useDispatch()

    const removeTask = (taskID: string, todoListId: string) => {
        dispatch(removeTaskAC(taskID, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListId))
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListId))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListId))
    }
    const removeTodolist = (todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

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

export default AppWithRedux;
