import { User } from '@/utility/types';
import { create } from 'zustand';

interface UserStore {
    user: User | null,
    setUser: (data: User | null) => void
    isLoader: boolean,
    showLoader: () => void,
    hideLoader: () => void,
}


const useUserStore = create<UserStore>((set) => (
    {
        user: null,
        isLoader: true,
        setUser: (data) => set(() => ({ user: data })),
        showLoader: () => set({ isLoader: true }),
        hideLoader: () => set({ isLoader: false }),
    }
))

export default useUserStore;