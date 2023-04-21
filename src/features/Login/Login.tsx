import React, {FormEventHandler, useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export type FormDataType = {
    email: string,
    password: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoginIn = useAppSelector(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            }
            if (values.password.length < 4) {
                errors.password = 'Password to short'
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            console.log(values)
            dispatch(loginTC(values))
        }
    });


    if (isLoginIn) {
        return <Navigate to={'/'}/>
    }
    else {
        return <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField label={formik.errors.email ? formik.errors.email : 'Email'}
                                       margin="normal"
                                       error={!!formik.errors.email}
                                       {...formik.getFieldProps('email')}
                            />

                            <TextField type="password"
                                       label={formik.errors.password && formik.touched.password ? formik.errors.password : 'Password'}
                                       margin="normal"
                                       error={formik.touched.password && !!formik.errors.password}
                                       {...formik.getFieldProps('password')}
                            />
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox/>}
                                checked={formik.values.rememberMe}
                                name='rememberMe'
                                onChange={formik.handleChange}
                                /* value={formik.values.rememberMe}*//>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>

    }


}