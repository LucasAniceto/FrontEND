/**
 * Centralized formatters for common data transformations
 * Used across all components to ensure consistency and enable i18n
 */

export const formatters = {
  /**
   * Format number as Brazilian currency (R$)
   * @example formatters.currency(1234.56) => "R$ 1.234,56"
   */
  currency: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  },

  /**
   * Format number with fixed decimal places
   * @example formatters.number(1234.5678, 2) => "1234.57"
   */
  number: (value: number, decimals = 2): string => {
    return value.toFixed(decimals)
  },

  /**
   * Format percentage with optional decimal places
   * @example formatters.percentage(15.5) => "15.50%"
   */
  percentage: (value: number, decimals = 2): string => {
    return `${value.toFixed(decimals)}%`
  },

  /**
   * Format CPF (Brazilian document)
   * @example formatters.cpf("12345678910") => "123.456.789-10"
   */
  cpf: (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11)
    if (cleaned.length < 11) return value
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`
  },

  /**
   * Format Phone (Brazilian)
   * @example formatters.phone("1199999999") => "(11) 99999-9999"
   */
  phone: (value: string): string => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11)
    if (cleaned.length < 10) return value
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  },

  /**
   * Format date to Brazilian locale (dd/mm/yyyy)
   * @example formatters.date("2025-11-21") => "21/11/2025"
   */
  date: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('pt-BR').format(dateObj)
  },

  /**
   * Format date and time (dd/mm/yyyy HH:mm)
   * @example formatters.dateTime("2025-11-21T10:30:00") => "21/11/2025 10:30"
   */
  dateTime: (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  },

  /**
   * Format investment quantity/shares
   * @example formatters.quantity(100.5) => "100,50"
   */
  quantity: (value: number, decimals = 2): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  },

  /**
   * Format profit/loss with +/- prefix and color indication
   * @example formatters.profitLoss(1234.56) => "+R$ 1.234,56"
   */
  profitLoss: (value: number): string => {
    const formatted = formatters.currency(Math.abs(value))
    return value >= 0 ? `+${formatted}` : `-${formatted}`
  },

  /**
   * Format profit/loss percentage with +/- prefix
   * @example formatters.profitLossPercentage(5.5) => "+5.50%"
   */
  profitLossPercentage: (value: number, decimals = 2): string => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${formatters.percentage(value, decimals)}`
  },

  /**
   * Truncate text to max length with ellipsis
   * @example formatters.truncate("Hello World", 5) => "Hello..."
   */
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  },

  /**
   * Format investment type name for display
   * @example formatters.investmentType("cdb") => "CDB"
   */
  investmentType: (type: string): string => {
    const types: Record<string, string> = {
      acao: 'Ação',
      fii: 'FII',
      cdb: 'CDB',
      fundo: 'Fundo',
      tesouro: 'Tesouro Direto',
      cripto: 'Criptomoeda',
    }
    return types[type] || type
  },

  /**
   * Format investment type name for display (short version)
   * @example formatters.investmentTypeShort("cdb") => "CDB"
   */
  investmentTypeShort: (type: string): string => {
    const types: Record<string, string> = {
      acao: 'Ação',
      fii: 'FII',
      cdb: 'CDB',
      fundo: 'Fundo',
      tesouro: 'TDirect',
      cripto: '₿',
    }
    return types[type] || type
  },

  /**
   * Format account type for display
   * @example formatters.accountType("investimento") => "Investimento"
   */
  accountType: (type: string): string => {
    const types: Record<string, string> = {
      investimento: 'Investimento',
      poupanca: 'Poupança',
      conta_corrente: 'Conta Corrente',
    }
    return types[type] || type
  },

  /**
   * Format liquidity period
   * @example formatters.liquidity("diaria") => "Diária"
   */
  liquidity: (liquidity: string): string => {
    const types: Record<string, string> = {
      diaria: 'Diária',
      '30-dias': '30 dias',
      '90-dias': '90 dias',
      'longo-prazo': 'Longo Prazo',
    }
    return types[liquidity] || liquidity
  },
}

/**
 * Get CSS class for profit/loss color
 * @example getColorClass(5.5) => "text-green-600"
 */
export function getProfitLossColor(value: number): string {
  if (value > 0) return 'text-green-600'
  if (value < 0) return 'text-red-600'
  return 'text-gray-600'
}

/**
 * Get CSS class for risk level color
 * @example getRiskLevelColor("alto") => "bg-red-100 text-red-800"
 */
export function getRiskLevelColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'baixo':
      return 'bg-green-100 text-green-800'
    case 'médio':
      return 'bg-yellow-100 text-yellow-800'
    case 'alto':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Get CSS class for alert type color
 * @example getAlertTypeColor("warning") => "bg-yellow-100 text-yellow-800"
 */
export function getAlertTypeColor(type: string): string {
  switch (type) {
    case 'opportunity':
      return 'bg-blue-100 text-blue-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'info':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
