import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {RequestStatusType, setStatusAC} from "./app-reducer";
import {fetchTodolistsTC} from "../features/TodolistsList/todolists-reducer";


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.status.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setStatusAC('loading'))
        dispatch(fetchTodolistsTC())
    }, [])

    if (status === "loading") {
    }
    if (status === "succeeded") {
        return <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>

    }
    else {
        return <LinearProgress/>
    }


}

export default App
