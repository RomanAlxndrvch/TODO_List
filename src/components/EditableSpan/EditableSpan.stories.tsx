import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    args: {title: 'Editable Span Test', changeTitle: action('title been changed')},
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpan1 = Template.bind({});


