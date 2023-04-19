import React, { ReactElement } from 'react'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ModalState {
    isOpen: boolean
    content: ReactElement | null
    openModal: (content: ReactElement) => void
    closeModal: () => void

    isLoginModalOpen: boolean
    openLoginModal: () => void
    closeLoginModal: () => void

    isRulesModalOpen: boolean
    openRulesModal: () => void
    closeRulesModal: () => void
}

export const useModalState = create<ModalState>()((set) => ({
    isOpen: false,
    content: null,
    openModal: (content: ReactElement) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),

    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),

    isRulesModalOpen: false,
    openRulesModal: () => set({ isRulesModalOpen: true }),
    closeRulesModal: () => set({ isRulesModalOpen: false }),
}))
