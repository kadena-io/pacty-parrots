import React from 'react'
import logo from './logo.svg'
import './App.css'

import { greenTheme } from './styles/themeGreen'
import { CssBaseline, Modal, ThemeProvider } from '@mui/material'
import { useModalState } from './states/ModalState'
import { modalStyle } from './const'

function App() {
    const modalContent = useModalState((state) => state.content)
    const isModalOpen = useModalState((state) => state.isOpen)
    const closeModal = useModalState((state) => state.closeModal)
    return (
        <ThemeProvider theme={greenTheme}>
            <Modal
                style={modalStyle}
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalContent || <div>Modal</div>}
            </Modal>
            <CssBaseline></CssBaseline>
        </ThemeProvider>
    )
}

export default App
