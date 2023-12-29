import React, { ChangeEvent, MouseEventHandler, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components/index";
import { TaskStatuses } from "common/enums/index";
import { TaskType } from "features/TodolistsList/api/tasks/tasksApi.types";
import { useActions } from "common/hooks/index";
import { tasksThunks } from "features/TodolistsList/model/tasks/taskSlice";
import { logDOM } from "@testing-library/react";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = React.memo(({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => removeTask({ taskId: task.id, todolistId: todolistId });

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    updateTask({
      taskId: task.id,
      todolistId: todolistId,
      domainModel: { status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New },
    });
  };

  const titleChangeHandler = (title: string) => {
    updateTask({ taskId: task.id, todolistId: todolistId, domainModel: { title } });
  };

  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={task.title} onChange={titleChangeHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
