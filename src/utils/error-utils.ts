import {setErrorMessageAC, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {AppThunkDispatch} from "../app/store";

export const handleServerNetworkError = (dispatch: AppThunkDispatch, err: string) => {
    dispatch(setStatusAC("failed"))
    dispatch(setErrorMessageAC(err))
}