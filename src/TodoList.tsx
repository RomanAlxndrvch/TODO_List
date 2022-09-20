import React, {useState, KeyboardEvent, ChangeEvent, useCallback, memo} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem,} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./reducers/tasks-reducer";
// rsc

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

const TodoList = memo((props: TodoListPropsType) => {
    let tasksForRender = [...props.tasks];
    switch (props.filter) {
        case "active":
            tasksForRender = tasksForRender.filter(t => !t.isDone)
            break
        case "completed":
            tasksForRender = tasksForRender.filter(t => t.isDone)
            break
        default:
            tasksForRender = [...props.tasks]
    }

    const tasksJSX = props.tasks.length
        ? tasksForRender.map(t => {
            console.log('Task')
            const removeTask = () => props.removeTask(t.id, props.id)

            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

            const changeTaskTitle = (editedTitle: string) => {
                props.changeTaskTitle(t.id, editedTitle, props.id)
            }
            return (
                <ListItem divider={true} sx={{padding: '0'}} key={t.id} className={t.isDone ? "task isDone" : "task"}>
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
        return () => props.changeTodoListFilter(filter, props.id)
    }
    const onClickHandler = () => props.changeTodoListFilter("all", props.id)


    const addTask = useCallback((value: string) => {
        props.addTask(value, props.id)
    }, [props.id, props.addTask])


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
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={onClickHandler}
                >All
                </Button>
                <Button
                    style={{margin: '5px'}}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={getOnClickHandler("active")}
                >Active
                </Button>
                <Button
                    style={{margin: '5px'}}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    variant={"contained"}
                    onClick={getOnClickHandler("completed")}
                >Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;