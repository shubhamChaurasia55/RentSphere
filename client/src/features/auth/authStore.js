import {create} from "zustand"

import { getCurrentUser } from "../../services/auth.service";
const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    login: (userData) => set({
        user: userData,
        isAuthenticated: true,
        loading: false,
    }),

    logout: () => set({
        user: null,
        isAuthenticated: false,
        loading: false,
    }),

    register: (userData) => set({
        user: userData,
        isAuthenticated: true,
        loading: false,
    }),

    fetchCurrentUser: async () => {
        set({ loading: true })
        try {
            const data = await getCurrentUser();
            console.log(data)
            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
            })
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
                loading: false,
            })
            throw error
        }
    }

}))

export default useAuthStore;