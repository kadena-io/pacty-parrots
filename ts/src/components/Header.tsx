import { AppBar, Box, Fab, Popover, styled, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import styles from '../styles/header/headerStyle'

import kadenaLogo from '../assets/images/logo_green.png'
import { useState } from 'react'
import Rules from './Rules'
import { usePactState } from '../states/PactState'
import { useModalState } from '../states/ModalState'
import LoginModal from './LoginModal'

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
        appBar: appBarStyle,
        kadena: kadenaStyle,
        textTitle: textTitleStyle,
        loginButton: loginButtonStyle,
        fab: fabStyle,
        loginIconButton: loginIconButtonStyle,
    } = styles

    const playerId = usePactState((state) => state.playerId)

    const [anchorEl, setAnchorEl] = useState(null)

    const isRulesModalOpen = useModalState((state) => state.isRulesModalOpen)
    const openRulesModal = useModalState((state) => state.openRulesModal)
    const closeRulesModal = useModalState((state) => state.closeRulesModal)

    if (!playerId) {
        openRulesModal()
    }

    const handleClick = () => {
        console.log('handleClick')
    }
    const handleClose = () => {
        console.log('handleClose')
    }

    return (
        <Box>
            <AppBar position="static" style={appBarStyle}>
                <Toolbar>
                    <a href="http://testnet.chainweb.com">
                        <img src={kadenaLogo} alt="Kadena" style={kadenaStyle} />
                    </a>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Box style={textTitleStyle}>{title}</Box>
                    </Typography>

                    <Box style={loginButtonStyle}>
                        <Fab
                            variant="extended"
                            size="medium"
                            style={fabStyle}
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

                    <Box style={loginIconButtonStyle}>
                        <Fab
                            variant="extended"
                            size="medium"
                            style={fabStyle}
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

                    <LoginModal />
                    <Rules />
                </Toolbar>
            </AppBar>
        </Box>
    )
}