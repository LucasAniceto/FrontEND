/**
 * SERVIÇO DE INVESTIMENTOS
 *
 * Responsável por comunicação com endpoints de investimentos do backend
 */

import type { DashboardData, Institution, Investment } from '@/types/dashboard'

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

// Serviço de Investimentos
export const investmentService = {
  /**
   * Obter dashboard completo do usuário
   */
  async getDashboard(): Promise<DashboardData> {
    return await apiClient.fetch<DashboardData>('/investments/dashboard', {
      method: 'GET',
    })
  },

  /**
   * Obter lista de instituições conectadas
   */
  async getInstitutions(): Promise<Institution[]> {
    return await apiClient.fetch<Institution[]>('/investments/institutions', {
      method: 'GET',
    })
  },

  /**
   * Conectar uma nova instituição via Open Finance
   * (integração com plataformas como Open Banking)
   */
  async connectInstitution(data: {
    institutionId: string
    accessToken: string
  }): Promise<Institution> {
    return await apiClient.fetch<Institution>('/investments/institutions/connect', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  /**
   * Desconectar uma instituição
   */
  async disconnectInstitution(institutionId: string): Promise<void> {
    await apiClient.fetch<void>(`/investments/institutions/${institutionId}/disconnect`, {
      method: 'POST',
    })
  },

  /**
   * Obter lista de investimentos do usuário
   */
  async getInvestments(): Promise<Investment[]> {
    return await apiClient.fetch<Investment[]>('/investments', {
      method: 'GET',
    })
  },

  /**
   * Obter detalhes de um investimento específico
   */
  async getInvestment(investmentId: string): Promise<Investment> {
    return await apiClient.fetch<Investment>(`/investments/${investmentId}`, {
      method: 'GET',
    })
  },

  /**
   * Atualizar dados de um investimento
   * (por exemplo, preço atual em tempo real)
   */
  async updateInvestment(
    investmentId: string,
    data: Partial<Investment>
  ): Promise<Investment> {
    return await apiClient.fetch<Investment>(`/investments/${investmentId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  /**
   * Sincronizar investimentos com instituição conectada
   */
  async syncInvestments(institutionId: string): Promise<Investment[]> {
    return await apiClient.fetch<Investment[]>(
      `/investments/institutions/${institutionId}/sync`,
      {
        method: 'POST',
      }
    )
  },

  /**
   * Obter histórico de rentabilidade
   */
  async getPerformanceHistory(params?: {
    startDate?: string
    endDate?: string
  }): Promise<Array<{ date: string; value: number; return: number }>> {
    const query = new URLSearchParams()
    if (params?.startDate) query.append('startDate', params.startDate)
    if (params?.endDate) query.append('endDate', params.endDate)

    return await apiClient.fetch<Array<{ date: string; value: number; return: number }>>(
      `/investments/performance?${query.toString()}`,
      {
        method: 'GET',
      }
    )
  },

  /**
   * Obter recomendações baseadas no perfil
   */
  async getRecommendations(): Promise<
    Array<{
      id: string
      name: string
      type: string
      reason: string
      expectedReturn: number
      riskLevel: 'baixo' | 'médio' | 'alto'
    }>
  > {
    return await apiClient.fetch(
      `/investments/recommendations`,
      {
        method: 'GET',
      }
    )
  },

  /**
   * Exportar dados de investimentos em PDF ou CSV
   */
  async exportInvestments(format: 'pdf' | 'csv'): Promise<Blob> {
    const response = await fetch(
      `${API_BASE_URL}/investments/export?format=${format}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Erro ao exportar dados')
    }

    return await response.blob()
  },
}
