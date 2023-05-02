import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, Result_Code} from "../../api/todolists-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkDispatch, useAppDispatch} from "../../app/store";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsloginInAc(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setIsInitializedAC(state, action: PayloadAction<{ status: boolean }>) {
            state.isInitialized = action.payload.status
        }

    }
})

// reducer
export const authReducer = slice.reducer

// actions
export const {setIsloginInAc} = slice.actions
export const {setIsInitializedAC} = slice.actions


//thunk
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch) => {
    const loginReturnData = await authAPI.login(data)
    dispatch(setAppStatusAC('loading'))
    try {
        if (loginReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc({value: true}))
        }
        else {
            handleServerAppError(loginReturnData.data, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch((setAppStatusAC('succeeded')))
    }

}

export const logoutTC = () => async (dispatch: Dispatch) => {
    const loginReturnData = await authAPI.logout()
    dispatch(setAppStatusAC('loading'))
    try {
        if (loginReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc({value: false}))
        }
        else {
            handleServerAppError(loginReturnData.data, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch((setAppStatusAC('succeeded')))
    }

}


export const initializeAppTC = () => async (dispatch: Dispatch) => {
    const initializeReturnData = await authAPI.me()
    try {
        if (initializeReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc({value: true}))
        }
        if (initializeReturnData.data.resultCode === Result_Code.Error) {
            dispatch(setIsloginInAc({value: false}))
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch(setIsInitializedAC({status: true}))
    }
}


