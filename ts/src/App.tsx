import './App.css'

import { greenTheme } from './styles/themeGreen'
import { CssBaseline, ThemeProvider } from '@mui/material'
import HomePage from './pages/HomePage'

function App() {
    return (
        <ThemeProvider theme={greenTheme}>
            <CssBaseline />
            <HomePage />
        </ThemeProvider>
    )
}

export default App
