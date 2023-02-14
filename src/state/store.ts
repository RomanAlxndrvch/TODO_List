import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodoListsActionsType, todolistsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootState = ReturnType<typeof store.getState>

type AppActionType = TasksActionsType | TodoListsActionsType
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
