import React from "react";
import classes from './Checkbox.module.css'
import {TaskType} from "../../List";

type CheckboxPropsType = {
    task: TaskType
    changeCheckBox: (id: string, el: boolean) => void
}

export function Checkbox(props: CheckboxPropsType) {
    const onChangeCheckBoxHandler = (el: TaskType) => {
        props.changeCheckBox(el.id, !el.isDone)
    }
    return (<input type="checkbox" checked={props.task.isDone}
                   onChange={() => onChangeCheckBoxHandler(props.task)}/>)
}