import {Dispatch} from "redux";
/*import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";*/
import {authAPI, Result_Code} from "../../api/todolists-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/main-app-reducer";

type authReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
    isInitialized: false

}

type authReducerActionType =
    ReturnType<typeof setIsloginInAc>
    | ReturnType<typeof setIsInitializedAC>


export const authReducer = (state: authReducerStateType = initialState, action: authReducerActionType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case "login/SET-IS-INITIALIZE": {
            return {...state, isInitialized: action.status}
        }
        default:
            return state
    }
}

//action
export const setIsloginInAc = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

export const setIsInitializedAC = (status: boolean) => {
    return {type: "login/SET-IS-INITIALIZE", status} as const
}

//thunk
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch) => {
    const loginReturnData = await authAPI.login(data)
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        if (loginReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc(true))
        }
        else {
            handleServerAppError(loginReturnData.data, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch((setAppStatusAC({status: 'succeeded'})))
    }

}

export const logoutTC = () => async (dispatch: Dispatch) => {
    const loginReturnData = await authAPI.logout()
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        if (loginReturnData.data.resultCode === Result_Code.Ok) {
            dispatch(setIsloginInAc(false))
        }
        else {
            handleServerAppError(loginReturnData.data, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch((setAppStatusAC({status: 'succeeded'})))
    }

}


export const initializeAppTC = () => async (dispatch: Dispatch<authReducerActionType>) => {
    const initializeReturnData = await authAPI.me()
    try {
        if (initializeReturnData.data.resultCode === Result_Code.Ok) dispatch(setIsloginInAc(true))
        if (initializeReturnData.data.resultCode === Result_Code.Error) dispatch(setIsloginInAc(false))
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}


