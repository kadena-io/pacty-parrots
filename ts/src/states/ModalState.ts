import React, { ReactElement } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ModalState {
    isOpen: boolean
    content: ReactElement | null
    openModal: (content: ReactElement) => void
    closeModal: () => void
}

export const useModalState = create<ModalState>()((set) => ({
    isOpen: false,
    content: null,
    openModal: (content: ReactElement) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
}))
