import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

const EditableSpan: React.FC<EditableSpanPropsType> = ({title}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    return (
        <span>{title}</span>
    );
};

export default EditableSpan;