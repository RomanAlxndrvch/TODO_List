import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskWithRedux} from "./TaskWithRedux";
import {Provider} from "react-redux";
import {store} from "../../reducers/store";


export default {
    title: 'TODOLIST/Task',
    component: TaskWithRedux,
    args: {
        changeTaskTitle: action('Change Title clicked'),
        removeTask: action('Remove Task Clicked'),
        changeTaskStatus: action('Change Task Status clicked')
    },
} as ComponentMeta<typeof TaskWithRedux>;


const Template: ComponentStory<typeof TaskWithRedux> = (args) =>
    <Provider store={store}>
        <TaskWithRedux {...args} />;
    </Provider>

export const TaskAnother = Template.bind({});

TaskAnother.args = {
    task: {id: '1', isDone: false, title: 'Test Tusk'},
    todoListId: '1'
}