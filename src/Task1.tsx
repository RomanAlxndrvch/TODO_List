import React, {ChangeEvent, memo, useCallback} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "./reducers/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task1 = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = () => dispatch(removeTaskAC(task.id, todolistId))

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))

    const changeTaskTitleHandler = (editedTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, editedTitle, todolistId))
    }

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