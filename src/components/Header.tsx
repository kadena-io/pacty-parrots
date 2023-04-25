import { AppBar, Box, Fab, Toolbar, Typography } from '@mui/material'

import styles from '../styles/header/headerStyle'

import kadenaLogo from '../assets/images/logo_green.png'
import RulesModal from './RulesModal'
import { usePactState } from '../states/PactState'
import { useModalState } from '../states/ModalState'
import LoginModal from './LoginModal'
import CrossChainModal from './CrossChainModal'

interface Props {
    title: string
}

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

    const openRulesModal = useModalState((state) => state.openRulesModal)

    const openLoginModal = useModalState((state) => state.openLoginModal)
    if (!playerId) {
        openRulesModal()
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
                            onClick={openLoginModal}
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
                            onClick={() => {
                                openRulesModal()
                            }}
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
                    <RulesModal />
                    <CrossChainModal />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
