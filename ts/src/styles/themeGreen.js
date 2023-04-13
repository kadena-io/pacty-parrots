import { createMuiTheme } from '@material-ui/core/styles'
import { fontStyleNHaas } from './fontConfig'

export const greenPrimaryColor = '#19a33c'
export const greenSecondaryColor = '#a6c600'
const backgroundImageUrl = require('../assets/images/Background.png')

export const greenTheme = createMuiTheme({
    name: 'greenTheme',
    palette: {
        primary: {
            main: greenPrimaryColor,
            // contrastText: 'white'
        },
    },
    typography: {
        fontFamily: [
            'Neue Haas Grotesk Text Pro Roman',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [fontStyleNHaas],
                body: {
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                },
            },
        },
        MuiSelect: {
            select: {
                color: 'white',
            },
        },
        MuiMenuItem: {
            root: {
                '&$selected': {
                    backgroundColor: greenSecondaryColor,
                },
                '&:hover': {
                    backgroundColor: greenSecondaryColor,
                },
                color: 'white',
                // backgroundColor: 'red'
            },
        },
        MuiList: {
            root: {
                backgroundColor: greenPrimaryColor,
            },
        },
        MuiFormLabel: {
            root: {
                color: 'white',
                '&$focused': {
                    color: 'white',
                },
            },
        },
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottomColor: 'white',
                },
                '&:after': {
                    borderBottomColor: 'white',
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottomColor: 'white',
                },
            },
            input: {
                color: 'white',
            },
        },
        MuiTextField: {
            root: {
                '&.blackInput .MuiFormLabel-root': {
                    color: 'black',
                },
                '&.blackInput .MuiInputBase-root input': {
                    color: 'black',
                },
                '&.blackInput .MuiInput-underline:before': {
                    borderBottomColor: 'black',
                },
                '&.blackInput .MuiInput-underline:after': {
                    borderBottomColor: 'black',
                },
            },
        },
        MuiChip: {
            root: {
                '&.headerChip': {
                    backgroundColor: 'white !important',
                },
            },
        },
        MuiButtonBase: {
            root: {
                '& a': {
                    textDecoration: 'none',
                },
            },
        },
    },
})
