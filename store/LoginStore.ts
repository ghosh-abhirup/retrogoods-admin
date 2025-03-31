import { create } from "zustand";

interface LoginStore {
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;

    openLoginModal: () => void;
    closeLoginModal: () => void;
    openRegisterModal: () => void;
    closeRegisterModal: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
    isLoginModalOpen: false,
    isRegisterModalOpen: false,

    openLoginModal: () => set({ isLoginModalOpen: true }),
    closeLoginModal: () => set({ isLoginModalOpen: false }),
    openRegisterModal: () => set({ isRegisterModalOpen: true }),
    closeRegisterModal: () => set({ isRegisterModalOpen: false }),
}))

export default useLoginStore;