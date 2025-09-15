import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'react-toastify'
import { loginService, registerService, getCurrentUserService, logoutService, type AuthUser, type LoginCredentials, type RegisterData } from '@/services/authService'

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  getCurrentUser: () => Promise<void>
  clearError: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await loginService(credentials)
          
          set({
            user: {
              _id: response._id,
              name: response.name,
              email: response.email,
              role: response.role,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          const errorMessage = (error as any)?.response?.data?.message || 'Login failed'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false 
          })
          throw new Error(errorMessage)
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await registerService(userData)
          
          set({
            user: {
              _id: response._id,
              name: response.name,
              email: response.email,
              role: response.role,
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
        } catch (error) {
          const errorMessage = (error as any)?.response?.data?.message || 'Registration failed'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false 
          })
          throw new Error(errorMessage)
        }
      },

      logout: async () => {
        try {
          await logoutService()
          toast.success('Successfully logged out')
        } catch (error) {
          console.error('Logout error:', error)
          toast.error('Logout failed')
        } finally {
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          })
        }
      },

      getCurrentUser: async () => {
        set({ isLoading: true })
        
        try {
          const user = await getCurrentUserService()
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      checkAuth: async () => {
        try {
          const user = await getCurrentUserService()
          set({
            user,
            isAuthenticated: true,
          })
        } catch {
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)