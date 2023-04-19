import { Box, Dialog, Fab, Paper, TextField, Typography } from '@mui/material'
import style from '../styles/modal/modalStyle'
import { useState } from 'react'
import { useModalState } from '../states/ModalState'
import { usePactState } from '../states/PactState'
import useGetPlayerTable from '../hooks/useGetPlayerTable'

// TODO: include modal open/close logic
// game logic integration

interface Props {}

export default function LoginModal({}: Props) {
    // give proper names
    const [value, setValue] = useState('')

    const setPlayerId = usePactState((state) => state.setPlayerId)

    const getPlayerTable = useGetPlayerTable()
    const {
        paperSize: paperSizeStyle,
        modalTitle: modalTitleStyle,
        enterAccountIdBox: enterAccountIdBoxStyle,
        enterId: enterIdStyle,
    } = style

    const [buttonEnabled, setButtonEnabled] = useState(true)

    const onHandleClick = async (event: any) => {
        setButtonEnabled(false)
        if (value !== '') {
            //modalContext.setModalClose();
            //pactContext.getPlayerTable();
            await getPlayerTable()
            setPlayerId(value)
            //window.location.reload()
        }
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
                            value={value}
                            style={{
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: 'white',
                            }}
                            onChange={(e: any) => {
                                setValue(e.target.value)
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
