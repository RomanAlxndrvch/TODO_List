import React, {memo} from "react";
import {TaskType} from "./reducers/tasks-reducer";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
}

export const Task = memo((props: TaskPropsType) => {
    return (
        <div>

        </div>
    )
})