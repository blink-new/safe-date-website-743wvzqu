import { createContext } from 'react'

interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)