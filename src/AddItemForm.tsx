import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = memo((props: AddItemFormType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        }
        else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                size={"small"}
                label={'Title'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                helperText={error && 'Title is required!'}
            />
            <IconButton onClick={onClickAddItem}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
})

export default AddItemForm;