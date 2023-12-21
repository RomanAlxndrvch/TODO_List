import React, { ChangeEvent, MouseEventHandler, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components/index";
import { TaskStatuses } from "common/enums/index";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { useActions } from "common/hooks/index";
import { tasksThunks } from "features/TodolistsList/model/tasks/taskSlice";
import { logDOM } from "@testing-library/react";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo((props: TaskPropsType) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: props.task.id, todolistId: props.todolistId });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    updateTask({
      taskId: props.task.id,
      todolistId: props.todolistId,
      domainModel: { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New },
    });
  };

  const titleChangeHandler = (newValue: string) => {
    updateTask({ taskId: props.task.id, todolistId: props.todolistId, domainModel: { title: newValue } });
  };

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        color="primary"
        onChange={changeTaskStatusHandler}
      />

      <EditableSpan value={props.task.title} onChange={titleChangeHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
