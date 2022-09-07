import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem,} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./reducers/tasks-reducer";
import {TodolistType} from "./AppWithReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./reducers/store";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./reducers/todolists-reducer";
// rsc

type TodoListPropsType = {
    todolist: TodolistType
}

const TodoList1 = ({todolist}: TodoListPropsType) => {
    const {title, filter, id} = todolist

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    let tasksForRender;
    switch (todolist.filter) {
        case "active":
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    const tasksJSX = tasks.length
        ? tasksForRender.map(t => {

            const removeTask = () => dispatch(removeTaskAC(t.id, id))

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))

            const changeTaskTitle = (editedTitle: string) => {
                dispatch(changeTaskTitleAC(t.id, editedTitle, id))

            }

            return (
                <ListItem divider={true} sx={{padding: '0'}} key={t.id}
                          className={t.isDone ? "task isDone" : "task"}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        size={"small"}
                        checked={t.isDone}

                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTask}>
                        <Delete fontSize={"small"}/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Your taskslist is empty</span>
    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => dispatch(ChangeTodoListFilterAC(filter, id))
    }
    const onClickHandler = () => dispatch(ChangeTodoListFilterAC("all", id))
    const addTask = (value: string) => {
        dispatch(addTaskAC(value, id))
    }
    const removeTodoist = () => {
        dispatch(RemoveTodolistAC(id))
    }
    const changeTodoTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(title, id))
    }


    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={removeTodoist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List sx={{width: '100%', maxWidth: 360}}>
                {tasksJSX}
            </List>
            <div>
                <Button
                    style={{margin: '5px'}}
                    color={filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={onClickHandler}
                >All
                </Button>
                <Button
                    style={{margin: '5px'}}
                    color={filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={getOnClickHandler("active")}
                >Active
                </Button>
                <Button
                    style={{margin: '5px'}}
                    color={filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={getOnClickHandler("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
}


export default TodoList1;