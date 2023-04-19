import React from 'react'
import logo from './logo.svg'
import './App.css'

import { greenTheme } from './styles/themeGreen'
import { CssBaseline, Modal, ThemeProvider } from '@mui/material'
import { useModalState } from './states/ModalState'
import { modalStyle } from './const'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
])

function App() {
    return (
        <ThemeProvider theme={greenTheme}>
            <CssBaseline />
            <HomePage />
        </ThemeProvider>
    )
}

export default App
