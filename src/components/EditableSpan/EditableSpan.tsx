import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (editedTitle: string) => void
}

const EditableSpan = memo(({title, changeTitle}: EditableSpanPropsType) => {
    console.log('span!')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(title)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        changeTitle(text)
    }
    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && offEditMode()

    return (
        editMode ?
            <TextField
                variant={"standard"}
                onChange={onChangeSetTitle}
                onBlur={offEditMode}
                value={text}
                onKeyDown={onKeyDownOffEditMode} autoFocus/>
            :
            <span
                onDoubleClick={onEditMode}>
                {title}
            </span>
    );
});

export default EditableSpan;