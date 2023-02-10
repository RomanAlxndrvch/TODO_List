import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export let store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
