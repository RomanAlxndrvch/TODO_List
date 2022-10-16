import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/Task',
    component: Task,

    argTypes: {},
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});

TaskIsDone.args = {
    task: {id: '1', isDone: true, title: 'Test Tusk'},
    changeTaskTitle: action('Change Title clicked'),
    removeTask: action('Remove Task Clicked'),
    changeTaskStatus: action('Change Task Status clicked')
};


export const TaskIsNotDone = Template.bind({});

TaskIsNotDone.args = {
    task: {id: '1', isDone: false, title: 'Test Tusk'},
    changeTaskTitle: action('Change Title clicked'),
    removeTask: action('Remove Task Clicked'),
    changeTaskStatus: action('Change Task Status clicked')
};
