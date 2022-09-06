import {combineReducers, legacy_createStore} from "redux";
import tasksReducer from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootState = ReturnType<typeof rootReducer>