import { AppBar, Box, Fab, Popover, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import styles from '../styles/header/headerStyle'

import kadenaLogo from '../assets/images/logo_green.png'
import { useState } from 'react'

interface Props {
    title: string
}

/*
    TODO:
        - add the popover game rules element
        - login for open/close 
        - read player id from state/context

*/

export default function Header({ title }: Props) {
    const {
        appBar: appBarClass,
        kadena: kadenaClass,
        textTitle: textTitleClass,
        loginButton: loginButtonClass,
        fab: fabClass,
        loginIconButton: loginIconButtonClass,
    } = styles

    const [anchorEl, setAnchorEl] = useState(null)

    const [open, setOpen] = useState(false)

    const id = open ? 'simple-popover' : undefined
    const handleClick = () => {
        console.log('handleClick')
    }
    const handleClose = () => {
        console.log('handleClose')
    }

    return (
        <Box>
            <AppBar position="static" className={appBarClass}>
                <Toolbar>
                    <Link to="http://testnet.chainweb.com">
                        <img src={kadenaLogo} alt="Kadena" className={kadenaClass} />
                    </Link>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Box className={textTitleClass}>{title}</Box>
                    </Typography>

                    <Box className={loginButtonClass}>
                        <Fab
                            variant="extended"
                            size="medium"
                            className={fabClass}
                            onClick={() => {
                                //modalContext.setModalOpen(<LoginModal/>)
                            }}
                        >
                            <Typography
                                color="primary"
                                style={{
                                    fontSize: '13px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Choose Account
                            </Typography>
                        </Fab>
                    </Box>

                    <Box className={loginIconButtonClass}>
                        <Fab
                            aria-describedby={id}
                            variant="extended"
                            size="medium"
                            className={fabClass}
                            onClick={handleClick}
                        >
                            <Typography
                                color="primary"
                                style={{
                                    fontSize: '13px',
                                    textTransform: 'capitalize',
                                }}
                            >
                                Game Rules
                            </Typography>
                        </Fab>
                    </Box>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        Rules component!
                    </Popover>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
