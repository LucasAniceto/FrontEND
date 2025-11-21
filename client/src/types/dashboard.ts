/**
 * Tipos para o Dashboard de Investimentos
 */

export interface Institution {
  id: string
  name: string
  type: 'banco' | 'corretora' | 'fintech'
  connected: boolean
  connectedAt?: string
  accounts: Account[]
}

export interface Account {
  id: string
  institutionId: string
  name: string
  type: 'investimento' | 'poupanca' | 'conta_corrente'
  balance: number
  currency: string
}

export interface Investment {
  id: string
  accountId: string
  institutionId: string
  name: string
  type: 'acao' | 'fii' | 'cdb' | 'fundo' | 'tesouro' | 'cripto'
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string
  currentValue: number
  profitLoss: number
  profitLossPercentage: number
}

export interface PortfolioSummary {
  totalInvested: number
  totalCurrentValue: number
  totalProfitLoss: number
  totalProfitLossPercentage: number
  institutions: number
  accounts: number
  investments: number
}

export interface InvestmentCategory {
  type: string
  name: string
  value: number
  percentage: number
  color: string
}

export interface MonthlyReturn {
  month: string
  return: number
  investedAmount: number
}

export interface RiskProfile {
  conservative: number
  moderate: number
  aggressive: number
}

export interface Recommendation {
  id: string
  title: string
  description: string
  type: 'migrar' | 'comprar' | 'aumentar'
  institution: string
  product: string
  currentReturn: number
  recommendedReturn: number
  potentialGain: number
  riskLevel: 'baixo' | 'médio' | 'alto'
  reason: string
}

export interface Alert {
  id: string
  type: 'opportunity' | 'warning' | 'info'
  title: string
  message: string
  investmentId?: string
  investmentName?: string
  action?: {
    label: string
    href?: string
  }
  timestamp: string
  read: boolean
}

export interface MarketProduct {
  id: string
  institution: string
  name: string
  type: 'cdb' | 'tesouro' | 'fundo' | 'acao' | 'fii'
  minInvestment: number
  currentReturn: number
  returnType: 'percentual' | 'indice'
  returnValue: number // 92 para 92% CDI, 115 para 115% CDI
  liquidity: 'diária' | '30-dias' | '90-dias' | 'longo-prazo'
  riskLevel: 'baixo' | 'médio' | 'alto'
  expirationDate?: string
  rating: number // 1-5
}

export interface MigrationSimulation {
  from: {
    product: string
    value: number
    currentReturn: number
    monthlyIncome: number
  }
  to: {
    product: string
    value: number
    expectedReturn: number
    monthlyIncome: number
  }
  break_even_months: number
  total_gain_1year: number
  total_gain_5years: number
  fees: number
}

export interface Report {
  id: string
  period: string
  startDate: string
  endDate: string
  summary: {
    totalInvested: number
    totalCurrentValue: number
    totalReturn: number
    averageMonthlyReturn: number
  }
  projections: {
    months_6: number
    months_12: number
    years_5: number
  }
  recommendations: string[]
  generatedAt: string
}

export interface DashboardData {
  user: {
    id: string
    name: string
    email: string
  }
  summary: PortfolioSummary
  institutions: Institution[]
  investments: Investment[]
  categories: InvestmentCategory[]
  monthlyReturns: MonthlyReturn[]
  riskProfile: RiskProfile
  recommendations?: Recommendation[]
  alerts?: Alert[]
  marketProducts?: MarketProduct[]
}
