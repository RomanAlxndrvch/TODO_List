import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";

type authReducerStateType = typeof initialState

const initialState = {
    isLoggedIn: false
}

type authReducerActionType = ReturnType<typeof loginInAc> | SetAppStatusActionType | SetAppErrorActionType

export const authReducer = (state: authReducerStateType = initialState, action: authReducerActionType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}

//action
export const loginInAc = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}

//thunk
export const loginTC = (data: any) => (dispatch: Dispatch<authReducerActionType>) => {
    dispatch(setAppStatusAC('loading'))
}


