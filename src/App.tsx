import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
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
import TodoList1 from "./unused/TodoList-1";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todoLists)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListId: string) => {
        dispatch(removeTaskAC(taskID, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListId))
    }, [dispatch])


    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filter, todoListId))
    }, [dispatch])


    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListId))
    }, [dispatch])


    const removeTodolist = useCallback((todolistId: string) => {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])


    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])


    //UI:
    const todoListsComponents = todoLists.map(el => {

        return (
            <Grid item key={el.id}>
                <Paper elevation={3} style={{padding: '20px'}}>
                    <TodoList
                        key={el.id}
                        id={el.id}
                        title={el.title}
                        filter={el.filter}
                        tasks={tasks[el.id]}
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
        <div className={'AppFirst'}>
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

export default App;
