export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}
type InitialStateType = typeof initialState
export type AppActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorMessageAC>

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case "APP/SET-ERROR-MESSAGE": {
            return {...state, error: action.message}
        }
        default:
            return state
    }
}


export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setErrorMessageAC = (message: string | null) => {
    return {
        type: 'APP/SET-ERROR-MESSAGE',
        message
    } as const
}
