export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    errorMessage: '' as string
}
type InitialStateType = typeof initialState
export type AppActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorMessageAC>

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case "SET-ERROR-MESSAGE": {
            return {...state, errorMessage: action.message[0]}
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

export const setErrorMessageAC = (message: string[]) => {
    return {
        type: 'SET-ERROR-MESSAGE',
        message
    } as const
}
