import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch} from "../../app/store";
import {setErrorMessageAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export type ErrorSnackbarPropsType = {
    error: string | null
}

export function ErrorSnackbar(props: ErrorSnackbarPropsType) {
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(setErrorMessageAC(null))
    }
    return (
        <Snackbar open={!!props.error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {props.error}
            </Alert>
        </Snackbar>
    )
}