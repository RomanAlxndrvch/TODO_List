import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    addItem: action('Btn clicked inside form')
};

/////////////////////////////////////////////////////////////////


const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(true)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.addItem(trimmedTitle)
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
}

export const AddItemFormStoryWithError = TemplateWithError.bind({});