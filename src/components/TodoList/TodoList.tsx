import React, {memo, useCallback} from 'react';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button, IconButton, List,} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskWithRedux} from "../Task/TaskWithRedux";
import {FilterValuesType} from "../../reducers/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolistApi";
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
    changeTaskStatus: (taskID: string, status: TaskStatuses, todoListId: string) => void
    removeTodolist: (e: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
}

const TodoList = memo(({addTask, removeTask, ...props}: TodoListPropsType) => {
    let tasksForRender = [...props.tasks];
    switch (props.filter) {
        case "active":
            tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
            break
        case "completed":
            tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)
            break
        default:
            tasksForRender = props.tasks
    }

    const removeTaskWithCallBack = useCallback((taskId: string) => removeTask(taskId, props.id), [removeTask, props.id])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses) => props.changeTaskStatus(taskId, status, props.id)
        , [props.id, props.changeTaskStatus])

    const changeTaskTitle = useCallback((taskId: string, editedTitle: string) => {
        props.changeTaskTitle(taskId, editedTitle, props.id)
    }, [props.changeTaskTitle, props.id])

    const tasksJSX = props.tasks.length
        ? tasksForRender.map(t => {
            return (
                /*<Task key={t.id} removeTask={removeTaskWithCallBack} changeTaskStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      task={t}/>*/
                <TaskWithRedux key={t.id} todoListId={props.id} task={t}/>

            )
        })
        : <span>Your taskslist is empty</span>

    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id)
    }
    const onClickHandler = () => props.changeTodoListFilter("all", props.id)


    const addTaskWithCallBack = useCallback((value: string) => {
        addTask(value, props.id)
    }, [props.id, addTask])


    const removeTodoist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTaskTitle, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
                <IconButton onClick={removeTodoist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskWithCallBack}/>
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