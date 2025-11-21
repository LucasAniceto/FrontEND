/**
 * SERVIÇO DE AUTENTICAÇÃO
 *
 * Responsável por comunicação com endpoints de autenticação do backend
 */

// Tipos
export interface User {
  id: string
  name: string
  email: string
  cpf?: string
  phone?: string
  createdAt?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  cpf: string
  phone: string
  password: string
}

export interface RegisterResponse {
  token: string
  user: User
}

// Configuração
// @ts-ignore
const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:3000/api'

// Cliente HTTP
const apiClient = {
  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('authToken')

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || `Erro ${response.status}`)
    }

    return await response.json()
  },
}

// Serviço de Autenticação
export const authService = {
  /**
   * Fazer login com email e senha
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.fetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    // Armazenar token automaticamente
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    return response
  },

  /**
   * Registrar novo usuário
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiClient.fetch<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    // Armazenar token automaticamente
    if (response.token) {
      localStorage.setItem('authToken', response.token)
    }

    return response
  },

  /**
   * Validar token atual
   */
  async validateToken(): Promise<User> {
    const token = localStorage.getItem('authToken')

    if (!token) {
      throw new Error('Nenhum token disponível')
    }

    return await apiClient.fetch<User>('/auth/validate', {
      method: 'GET',
    })
  },

  /**
   * Fazer logout
   */
  async logout(): Promise<void> {
    try {
      await apiClient.fetch<void>('/auth/logout', {
        method: 'POST',
      })
    } finally {
      // Sempre remover token localmente, mesmo se logout falhar
      localStorage.removeItem('authToken')
    }
  },

  /**
   * Obter token armazenado
   */
  getToken(): string | null {
    return localStorage.getItem('authToken')
  },

  /**
   * Remover token armazenado
   */
  removeToken(): void {
    localStorage.removeItem('authToken')
  },

  /**
   * Verificar se usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}
