import React, {memo, useCallback} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../reducers/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const TaskWithRedux = memo(({todoListId, task}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(task.id, todoListId))
    }, [dispatch, task, todoListId])

    const changeTaskStatusHandler = useCallback(() => {
        dispatch(changeTaskStatusAC(task.id, !task.isDone, todoListId))
    }, [dispatch, task, todoListId])

    const changeTaskTitleHandler = useCallback((editedTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, editedTitle, todoListId))
    }, [dispatch, task.id])


    return (
        <div>
            <ListItem divider={true} sx={{padding: '0'}}
                      className={task.isDone ? "task isDone" : "task"}>
                <Checkbox
                    onChange={changeTaskStatusHandler}
                    size={"small"}
                    checked={task.isDone}

                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                <IconButton onClick={removeTaskHandler}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </ListItem>
        </div>
    )
})