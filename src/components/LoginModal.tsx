import { Box, Dialog, Fab, Paper, TextField, Typography } from '@mui/material'
import style from '../styles/modal/modalStyle'
import { useState } from 'react'
import { MessageKeys, useModalState } from '../states/ModalState'
import { usePactState } from '../states/PactState'
import useGetPlayerTable from '../hooks/useGetPlayerTable'
import useCheckCrossChainBalance from '../hooks/useCheckCrossChainBalance'

export default function LoginModal() {
    const [givenPlayerId, setGivenPlayerId] = useState('')

    const setPlayerId = usePactState((state) => state.setPlayerId)

    const getPlayerTable = useGetPlayerTable()
    const {
        paperSize: paperSizeStyle,
        modalTitle: modalTitleStyle,
        enterAccountIdBox: enterAccountIdBoxStyle,
        enterId: enterIdStyle,
    } = style

    const [buttonEnabled, setButtonEnabled] = useState(true)
    const checkCrossChainBalance = useCheckCrossChainBalance()
    const openCrossChainModal = useModalState((state) => state.openCrossChainModal)
    const onHandleClick = async (event: any) => {
        setButtonEnabled(false)
        if (givenPlayerId !== '') {
            /*
            const balances = await checkCrossChainBalance(givenPlayerId)
            if (!balances) return
            if (balances.length === 0) {
                openCrossChainModal(MessageKeys.NoBalance)
                return
            }
            if (balances[0].chainId !== 0) {
                openCrossChainModal(MessageKeys.CrossChain)
                return
            }*/

            await getPlayerTable(givenPlayerId)
            setPlayerId(givenPlayerId)

            window.location.reload()
        }
        setButtonEnabled(true)
    }

    const isOpen = useModalState((state) => state.isLoginModalOpen)

    return (
        <Dialog open={isOpen}>
            <Box>
                <Paper style={paperSizeStyle}>
                    <Typography style={modalTitleStyle}>Login</Typography>
                    <Box style={enterAccountIdBoxStyle}>
                        <Typography style={enterIdStyle} variant="h6">
                            Enter Account Name
                        </Typography>
                        <TextField
                            placeholder="account"
                            margin="normal"
                            variant="outlined"
                            value={givenPlayerId}
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: 'white',
                            }}
                            onChange={(e: any) => {
                                setButtonEnabled(true)
                                setGivenPlayerId(e.target.value)
                            }}
                        />

                        <Fab
                            disabled={!buttonEnabled}
                            variant="extended"
                            color="primary"
                            size="small"
                        >
                            <Typography
                                color="primary"
                                style={{
                                    color: 'white',
                                    textTransform: 'capitalize',
                                }}
                                onClick={onHandleClick}
                            >
                                Let's Play!
                            </Typography>
                        </Fab>
                    </Box>
                </Paper>
            </Box>
        </Dialog>
    )
}
