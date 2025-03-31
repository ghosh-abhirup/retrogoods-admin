import { User } from '@/utility/types';
import { create } from 'zustand';

interface UserStore {
    user: User | null,
    setUser: (data: User | null) => void
}


const useUserStore = create<UserStore>((set) => (
    {
        user: null,
        setUser: (data) => set(() => ({ user: data }))
    }
))

export default useUserStore;