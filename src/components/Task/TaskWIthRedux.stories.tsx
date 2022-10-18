import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskWithRedux} from "./TaskWithRedux";
import {Provider, useSelector} from "react-redux";
import {AppRootState, store} from "../../reducers/store";
import {ReduxStoreProviderDecorator} from "../../stories/decorators/ReduxStoreProviderDecorator";
import {TaskType} from "../../reducers/tasks-reducer";


export default {
    title: 'TODOLIST/Task',
    component: TaskWithRedux,
    args: {
        changeTaskTitle: action('Change Title clicked'),
        removeTask: action('Remove Task Clicked'),
        changeTaskStatus: action('Change Task Status clicked')
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithReduxContainer>;


const TaskWithReduxContainer = () => {
    const task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0])
    return <TaskWithRedux todoListId={'todolistId1'} task={task}/>;
 
}

const Template: ComponentStory<typeof TaskWithReduxContainer> = (args) => {
    return <TaskWithReduxContainer/>
}


export const TaskWithReduxExample = Template.bind({});

