import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthUser {
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const DEMO_CREDENTIALS = { email: 'admin@elsai.com', password: 'Admin@123' }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem('elsai_user')
    return stored ? JSON.parse(stored) : null
  })

  function login(email: string, password: string): boolean {
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const authUser = { name: 'James Smith', email }
      setUser(authUser)
      sessionStorage.setItem('elsai_user', JSON.stringify(authUser))
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('elsai_user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
