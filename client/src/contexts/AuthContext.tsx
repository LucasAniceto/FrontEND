import React, { createContext, useState, useCallback, useEffect } from 'react'
import { authService } from '@/services/authService'

export interface User {
  id: string
  name: string
  email: string
  cpf?: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (cpf: string, password: string) => Promise<void>
  register: (name: string, email: string, cpf: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Validar token ao montar o componente (restaurar sessão)
  useEffect(() => {
    const validateStoredToken = async () => {
      try {
        if (!authService.isAuthenticated()) {
          setIsLoading(false)
          return
        }

        const authenticatedUser = await authService.validateToken()
        setUser({
          id: authenticatedUser.id,
          name: authenticatedUser.name,
          email: authenticatedUser.email,
        })
      } catch (err) {
        // Token inválido ou expirado
        authService.removeToken()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    validateStoredToken()
  }, [])

  const login = useCallback(async (cpf: string, password: string) => {
    setIsLoading(true)
    try {
    const response = await authService.login({ cpf, password })
    setUser(response.user)
    } catch (err) {
      console.error("Erro no login:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (
    name: string,
    email: string,
    cpf: string,
    _password: string
  ) => {
    setIsLoading(true)
    try {
      // Integração com API real (descomentar quando backend estiver pronto)
       const response = await authService.register({ name, email, cpf, password: _password})
       setUser({
         id: response.user.id,
         name: response.user.name,
         email: response.user.email,
       })

       } catch (err) {
    console.error(err)
    throw err
  } finally {
    setIsLoading(false)
  }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      // Tentar fazer logout no backend (opcional, pode falhar)
      // await authService.logout()

      // Sempre limpar estado local
      authService.removeToken()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
