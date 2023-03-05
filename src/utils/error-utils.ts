import {AppActionsType, setErrorMessageAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {AppThunkDispatch} from "../app/store";
import {changeEntityStatusAC} from "../features/TodolistsList/todolists-reducer";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, err: string) => {
    dispatch(setStatusAC("failed"))
    dispatch(setErrorMessageAC(err))
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>, todolistId: string) => {
    if (data.messages.length) {
        dispatch(setErrorMessageAC(data.messages[0]))
    }
    else {
        dispatch(setErrorMessageAC('Some error.'))
    }
    dispatch(changeEntityStatusAC('failed', todolistId))
    dispatch(setStatusAC("failed"))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>