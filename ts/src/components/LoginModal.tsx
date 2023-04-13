import { Box, Fab, Paper, TextField, Typography } from '@mui/material'
import style from '../styles/modal/modalStyle'
import { useState } from 'react'

// TODO: include modal open/close logic
// game logic integration

interface Props {}

export default function LoginModal({}: Props) {
    // give proper names
    const [value, setValue] = useState('')
    const {
        paperSize: paperSizeClass,
        modalTitle: modalTitleClass,
        enterAccountIdBox: enterAccountIdBoxClass,
        enterId: enterIdClass,
    } = style()

    const onHandleClick = (event: any) => {
        if (value !== '') {
            //modalContext.setModalClose();
            //pactContext.getPlayerTable();
            window.location.reload()
        }
    }

    return (
        <Box>
            <Paper className={paperSizeClass}>
                <Typography className={modalTitleClass}>Login</Typography>
                <Box className={enterAccountIdBoxClass}>
                    <Typography className={enterIdClass} variant="h6">
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
                            //setPlayerId(e.target.value)
                        }}
                    />

                    <Fab variant="extended" color="primary" size="small">
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
    )
}
