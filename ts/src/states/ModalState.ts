import { ReactElement } from 'react'
import { create } from 'zustand'

export enum MessageKeys {
    CrossChain = 'crossChain',
    NoBalance = 'noBalance',
}

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

    isCrossChainModalOpen: boolean
    openCrossChainModal: (messageKey: MessageKeys) => void
    closeCrossChainModal: () => void
    activeMessageKey: MessageKeys
}

export const useModalState = create<ModalState>()((set) => ({
    isOpen: false,
    content: null,
    manualOpenRulesModal: false,
    openModal: (content: ReactElement) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),

    isLoginModalOpen: false,
    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),

    isRulesModalOpen: false,
    openRulesModal: () => set({ isRulesModalOpen: true }),
    closeRulesModal: () => set({ isRulesModalOpen: false }),

    isCrossChainModalOpen: false,
    openCrossChainModal: (messageKey: MessageKeys) =>
        set({ activeMessageKey: messageKey, isCrossChainModalOpen: true }),
    closeCrossChainModal: () => set({ isCrossChainModalOpen: false }),
    activeMessageKey: MessageKeys.CrossChain,
}))
