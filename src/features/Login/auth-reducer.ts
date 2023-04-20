import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, Result_Code} from "../../api/todolists-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type authReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

type authReducerActionType = ReturnType<typeof setIsloginInAc> | SetAppStatusActionType | SetAppErrorActionType

export const authReducer = (state: authReducerStateType = initialState, action: authReducerActionType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

//action
export const setIsloginInAc = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

//thunk
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch<authReducerActionType>) => {
    const loginReturnData = await authAPI.login(data)
    dispatch(setAppStatusAC('loading'))
    try {
        if (loginReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc(true))
        }
        else {
            handleServerAppError(loginReturnData.data, dispatch)
            console.log(loginReturnData.data)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    }

}


