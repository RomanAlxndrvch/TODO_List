import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (editedTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({title, changeTitle}) => {
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
            <input
                onBlur={offEditMode}
                value={text}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownOffEditMode} autoFocus/>
            :
            <span
                onDoubleClick={onEditMode}>
                {title}
            </span>
    );
};

export default EditableSpan;