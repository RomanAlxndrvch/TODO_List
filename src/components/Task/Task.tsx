import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskType} from "../../reducers/tasks-reducer";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string,) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string,) => void
}

export const Task = memo(({task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {
    const removeTaskHandler = () => removeTask(task.id)

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked,)

    const changeTaskTitleHandler = useCallback((editedTitle: string) => {
        changeTaskTitle(task.id, editedTitle)
    }, [changeTaskTitle, task.id])


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