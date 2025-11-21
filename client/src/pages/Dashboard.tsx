import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Building2,
  Plus,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useLocation } from "wouter"
import type { DashboardData, Investment } from "@/types/dashboard"
import { AlertsPanel } from "@/components/AlertsPanel"
import { RecommendationsPanel } from "@/components/RecommendationsPanel"
import { ProductComparison } from "@/components/ProductComparison"
import { MigrationSimulator } from "@/components/MigrationSimulator"
import { ReportsPanel } from "@/components/ReportsPanel"
import { ThemeToggle } from "@/components/ThemeToggle"

// Dados mockados - substitua por chamada à API depois
const MOCK_DASHBOARD_DATA: DashboardData = {
  user: {
    id: "1",
    name: "Administrador",
    email: "admin@investic.com",
  },
  summary: {
    totalInvested: 450000,
    totalCurrentValue: 517300,
    totalProfitLoss: 67300,
    totalProfitLossPercentage: 14.96,
    institutions: 3,
    accounts: 6,
    investments: 24,
  },
  institutions: [
    {
      id: "1",
      name: "Banco do Brasil",
      type: "banco",
      connected: true,
      connectedAt: "2024-01-15",
      accounts: [
        {
          id: "1-1",
          institutionId: "1",
          name: "Conta Corrente",
          type: "conta_corrente",
          balance: 5000,
          currency: "BRL",
        },
        {
          id: "1-2",
          institutionId: "1",
          name: "Poupança",
          type: "poupanca",
          balance: 25000,
          currency: "BRL",
        },
      ],
    },
    {
      id: "2",
      name: "XP Investimentos",
      type: "corretora",
      connected: true,
      connectedAt: "2024-02-10",
      accounts: [
        {
          id: "2-1",
          institutionId: "2",
          name: "Conta de Investimento",
          type: "investimento",
          balance: 487300,
          currency: "BRL",
        },
      ],
    },
    {
      id: "3",
      name: "Nubank",
      type: "fintech",
      connected: true,
      connectedAt: "2024-03-05",
      accounts: [
        {
          id: "3-1",
          institutionId: "3",
          name: "Conta Nubank",
          type: "conta_corrente",
          balance: 10000,
          currency: "BRL",
        },
      ],
    },
  ],
  investments: [
    {
      id: "1",
      accountId: "2-1",
      institutionId: "2",
      name: "Ação: Petrobras (PETR4)",
      type: "acao",
      quantity: 100,
      purchasePrice: 25.5,
      currentPrice: 28.75,
      purchaseDate: "2024-01-20",
      currentValue: 2875,
      profitLoss: 325,
      profitLossPercentage: 12.75,
    },
    {
      id: "2",
      accountId: "2-1",
      institutionId: "2",
      name: "Ação: Vale (VALE3)",
      type: "acao",
      quantity: 50,
      purchasePrice: 68.2,
      currentPrice: 72.5,
      purchaseDate: "2024-02-01",
      currentValue: 3625,
      profitLoss: 215,
      profitLossPercentage: 6.29,
    },
    {
      id: "3",
      accountId: "2-1",
      institutionId: "2",
      name: "CDB Itaú 110% CDI",
      type: "cdb",
      quantity: 1,
      purchasePrice: 100000,
      currentPrice: 103500,
      purchaseDate: "2023-12-15",
      currentValue: 103500,
      profitLoss: 3500,
      profitLossPercentage: 3.5,
    },
    {
      id: "4",
      accountId: "2-1",
      institutionId: "2",
      name: "Fundo Imobiliário: HGLG11",
      type: "fii",
      quantity: 80,
      purchasePrice: 115.3,
      currentPrice: 118.9,
      purchaseDate: "2023-11-10",
      currentValue: 9512,
      profitLoss: 288,
      profitLossPercentage: 2.88,
    },
    {
      id: "5",
      accountId: "2-1",
      institutionId: "2",
      name: "Fundo de Renda Fixa: VGIR11",
      type: "fundo",
      quantity: 500,
      purchasePrice: 85.5,
      currentPrice: 87.2,
      purchaseDate: "2024-01-05",
      currentValue: 43600,
      profitLoss: 850,
      profitLossPercentage: 1.99,
    },
    {
      id: "6",
      accountId: "2-1",
      institutionId: "2",
      name: "Tesouro Direto: IPCA+ 2035",
      type: "tesouro",
      quantity: 10,
      purchasePrice: 2500,
      currentPrice: 2650,
      purchaseDate: "2023-10-20",
      currentValue: 26500,
      profitLoss: 1500,
      profitLossPercentage: 6.0,
    },
    {
      id: "7",
      accountId: "2-1",
      institutionId: "2",
      name: "Bitcoin",
      type: "cripto",
      quantity: 0.5,
      purchasePrice: 30000,
      currentPrice: 42000,
      purchaseDate: "2024-01-15",
      currentValue: 21000,
      profitLoss: 6000,
      profitLossPercentage: 40.0,
    },
  ],
  categories: [
    {
      type: "acao",
      name: "Ações",
      value: 6500,
      percentage: 12.56,
      color: "bg-blue-500",
    },
    {
      type: "fii",
      name: "FIIs",
      value: 9512,
      percentage: 18.39,
      color: "bg-purple-500",
    },
    {
      type: "cdb",
      name: "CDB",
      value: 103500,
      percentage: 20.01,
      color: "bg-green-500",
    },
    {
      type: "fundo",
      name: "Fundos",
      value: 43600,
      percentage: 8.43,
      color: "bg-yellow-500",
    },
    {
      type: "tesouro",
      name: "Tesouro Direto",
      value: 26500,
      percentage: 5.12,
      color: "bg-orange-500",
    },
    {
      type: "cripto",
      name: "Criptomoedas",
      value: 21000,
      percentage: 4.06,
      color: "bg-red-500",
    },
  ],
  monthlyReturns: [
    { month: "Janeiro", return: 2500, investedAmount: 150000 },
    { month: "Fevereiro", return: 3200, investedAmount: 175000 },
    { month: "Março", return: 2800, investedAmount: 200000 },
    { month: "Abril", return: 4100, investedAmount: 225000 },
    { month: "Maio", return: 3900, investedAmount: 250000 },
    { month: "Junho", return: 5200, investedAmount: 300000 },
    { month: "Julho", return: 6100, investedAmount: 350000 },
    { month: "Agosto", return: 4900, investedAmount: 400000 },
    { month: "Setembro", return: 7300, investedAmount: 450000 },
    { month: "Outubro", return: 6800, investedAmount: 480000 },
    { month: "Novembro", return: 8200, investedAmount: 500000 },
    { month: "Dezembro", return: 9100, investedAmount: 517300 },
  ],
  riskProfile: {
    conservative: 30,
    moderate: 45,
    aggressive: 25,
  },
  alerts: [
    {
      id: "1",
      type: "opportunity",
      title: "CDB com Melhor Taxa Disponível",
      message: "Seu CDB Itaú rende 92% do CDI. Há um CDB Bradesco a 115% disponível. Migração pode gerar R$ 3.450/ano.",
      investmentName: "CDB Itaú 110% CDI",
      action: { label: "Ver Simulação" },
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: "2",
      type: "opportunity",
      title: "Oportunidade de Ganho em FIIs",
      message: "O FII HGLG11 teve alta de 5% no mês. Analistas recomendam aumentar posição.",
      investmentName: "Fundo Imobiliário: HGLG11",
      action: { label: "Aumentar Posição" },
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Concentração em Tesouro",
      message: "Tesouro IPCA+ representa 5% da carteira. Considere diversificar para reduzir risco.",
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      read: false,
    },
    {
      id: "4",
      type: "info",
      title: "Dividendos Creditados",
      message: "Dividendos de suas ações foram creditados. R$ 125,50 em sua conta.",
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      read: true,
    },
  ],
  recommendations: [
    {
      id: "1",
      title: "Migrar CDB Itaú para Bradesco",
      description: "Aumente sua rentabilidade migrando para um CDB com melhor taxa",
      type: "migrar",
      institution: "Banco Itaú",
      product: "CDB Bradesco 115% CDI",
      currentReturn: 9.2,
      recommendedReturn: 9.7,
      potentialGain: 5500,
      riskLevel: "baixo",
      reason: "Mesmo risco, maior rentabilidade. Não há taxas de migração.",
    },
    {
      id: "2",
      title: "Aumentar Posição em Tesouro IPCA+",
      description: "Proteja-se contra inflação aumentando sua exposição a Tesouro Direto",
      type: "aumentar",
      institution: "Tesouro Nacional",
      product: "Tesouro IPCA+ 2035",
      currentReturn: 7.8,
      recommendedReturn: 7.8,
      potentialGain: 3200,
      riskLevel: "baixo",
      reason: "Com inflação em alta, é uma proteção interessante. Considere adicionar R$ 50 mil.",
    },
    {
      id: "3",
      title: "Comprar FII Diversificado",
      description: "Adicione renda mensal passiva com FIIs de qualidade",
      type: "comprar",
      institution: "XP Investimentos",
      product: "FII Diversificado - TOP FIIs",
      currentReturn: 8.5,
      recommendedReturn: 8.8,
      potentialGain: 2400,
      riskLevel: "médio",
      reason: "Você já tem HGLG11. Diversificar em múltiplos FIIs reduz risco e aumenta renda mensal.",
    },
  ],
  marketProducts: [
    {
      id: "1",
      institution: "Bradesco",
      name: "CDB 115% CDI",
      type: "cdb",
      minInvestment: 1000,
      currentReturn: 9.7,
      returnType: "indice",
      returnValue: 115,
      liquidity: "longo-prazo",
      riskLevel: "baixo",
      rating: 4.8,
    },
    {
      id: "2",
      institution: "Itaú",
      name: "CDB 110% CDI",
      type: "cdb",
      minInvestment: 1000,
      currentReturn: 9.2,
      returnType: "indice",
      returnValue: 110,
      liquidity: "longo-prazo",
      riskLevel: "baixo",
      rating: 4.6,
    },
    {
      id: "3",
      institution: "Tesouro Nacional",
      name: "Tesouro IPCA+ 2035",
      type: "tesouro",
      minInvestment: 31.46,
      currentReturn: 7.8,
      returnType: "percentual",
      returnValue: 7.8,
      liquidity: "longo-prazo",
      riskLevel: "baixo",
      rating: 4.7,
    },
    {
      id: "4",
      institution: "Vanguard",
      name: "Fundo Renda Fixa Global",
      type: "fundo",
      minInvestment: 100,
      currentReturn: 8.2,
      returnType: "percentual",
      returnValue: 8.2,
      liquidity: "diária",
      riskLevel: "baixo",
      rating: 4.5,
    },
    {
      id: "5",
      institution: "XP Investimentos",
      name: "FII TOP Diversificado",
      type: "fii",
      minInvestment: 100,
      currentReturn: 8.8,
      returnType: "percentual",
      returnValue: 8.8,
      liquidity: "diária",
      riskLevel: "médio",
      rating: 4.4,
    },
    {
      id: "6",
      institution: "BTG Pactual",
      name: "Fundo Multimercado Conservador",
      type: "fundo",
      minInvestment: 500,
      currentReturn: 8.5,
      returnType: "percentual",
      returnValue: 8.5,
      liquidity: "30-dias",
      riskLevel: "médio",
      rating: 4.3,
    },
    {
      id: "7",
      institution: "B3",
      name: "Ação: Petrobras (PETR4)",
      type: "acao",
      minInvestment: 2875,
      currentReturn: 12.75,
      returnType: "percentual",
      returnValue: 12.75,
      liquidity: "diária",
      riskLevel: "alto",
      rating: 4.1,
    },
    {
      id: "8",
      institution: "B3",
      name: "Ação: Vale (VALE3)",
      type: "acao",
      minInvestment: 3625,
      currentReturn: 6.29,
      returnType: "percentual",
      returnValue: 6.29,
      liquidity: "diária",
      riskLevel: "alto",
      rating: 3.9,
    },
    {
      id: "9",
      institution: "Crypto.com",
      name: "Bitcoin",
      type: "acao",
      minInvestment: 21000,
      currentReturn: 40.0,
      returnType: "percentual",
      returnValue: 40.0,
      liquidity: "diária",
      riskLevel: "alto",
      rating: 3.5,
    },
  ],
}

export default function Dashboard() {
  const { isAuthenticated, user } = useAuth()
  const [, setLocation] = useLocation()
  const [showValues, setShowValues] = useState(true)
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 light:bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="dark:text-gray-300 light:text-gray-700 mb-6">
            Você precisa estar logado para acessar o dashboard
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    )
  }

  const data = MOCK_DASHBOARD_DATA

  const formatCurrency = (value: number) => {
    if (!showValues) return "•••••"
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatNumber = (value: number, decimals = 2) => {
    return value.toFixed(decimals)
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 light:bg-white">
      {/* Header */}
      <div className="dark:bg-gray-800 light:bg-gray-50 border-b dark:border-gray-700 light:border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-[#FFC107] hover:text-[#FFB800] transition"
          >
            ← Home
          </button>
          <h1 className="dark:text-white light:text-gray-900 font-bold text-xl">Dashboard de Investimentos</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowValues(!showValues)}
              className="flex items-center gap-2 dark:text-gray-300 light:text-gray-700 hover:text-[#FFC107] transition"
            >
              {showValues ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Bem-vindo */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold dark:text-white light:text-gray-900 mb-2">
            Bem-vindo, <span className="text-[#FFC107]">{user?.name}</span>!
          </h2>
          <p className="dark:text-gray-400 light:text-gray-600">
            Visualize seu portfólio consolidado de investimentos em uma única plataforma
          </p>
        </div>

        {/* Resumo Principal */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {/* Saldo Total */}
          <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Saldo Total</span>
              <DollarSign className="w-5 h-5 text-[#FFC107]" />
            </div>
            <p className="text-3xl font-bold dark:text-white light:text-gray-900">
              {formatCurrency(data.summary.totalCurrentValue)}
            </p>
            <p className="text-sm dark:text-gray-400 light:text-gray-600 mt-2">
              Investido: {formatCurrency(data.summary.totalInvested)}
            </p>
          </Card>

          {/* Lucro/Prejuízo */}
          <Card
            className={`p-6 border-2 ${
              data.summary.totalProfitLoss >= 0
                ? "border-green-500/20 dark:bg-green-900/10 light:bg-green-50/50"
                : "border-red-500/20 dark:bg-red-900/10 light:bg-red-50/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Lucro/Prejuízo</span>
              {data.summary.totalProfitLoss >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <p
              className={`text-3xl font-bold ${
                data.summary.totalProfitLoss >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {formatCurrency(data.summary.totalProfitLoss)}
            </p>
            <p
              className={`text-sm mt-2 ${
                data.summary.totalProfitLoss >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.summary.totalProfitLossPercentage > 0 ? "+" : ""}
              {formatNumber(data.summary.totalProfitLossPercentage)}%
            </p>
          </Card>

          {/* Instituições */}
          <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Instituições</span>
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white light:text-gray-900">{data.summary.institutions}</p>
            <p className="text-sm dark:text-gray-400 light:text-gray-600 mt-2">
              {data.summary.accounts} contas conectadas
            </p>
          </Card>

          {/* Investimentos */}
          <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold dark:text-gray-400 light:text-gray-600">Investimentos</span>
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-3xl font-bold dark:text-white light:text-gray-900">{data.summary.investments}</p>
            <p className="text-sm dark:text-gray-400 light:text-gray-600 mt-2">ativos diferentes</p>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Distribuição por Tipo */}
          <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-[#FFC107]" />
              <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Distribuição por Tipo</h3>
            </div>

            <div className="space-y-4">
              {data.categories.map((category) => (
                <div key={category.type}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">
                      {category.name}
                    </span>
                    <span className="text-sm font-bold dark:text-white light:text-gray-900">
                      {formatNumber(category.percentage)}%
                    </span>
                  </div>
                  <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-2">
                    <div
                      className={`${category.color} rounded-full h-2`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">
                    {formatCurrency(category.value)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Perfil de Risco */}
          <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#FFC107]" />
              <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Perfil de Risco</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">Conservador</span>
                  <span className="text-sm font-bold dark:text-white light:text-gray-900">
                    {formatNumber(data.riskProfile.conservative)}%
                  </span>
                </div>
                <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 rounded-full h-3"
                    style={{ width: `${data.riskProfile.conservative}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">Moderado</span>
                  <span className="text-sm font-bold dark:text-white light:text-gray-900">
                    {formatNumber(data.riskProfile.moderate)}%
                  </span>
                </div>
                <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 rounded-full h-3"
                    style={{ width: `${data.riskProfile.moderate}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold dark:text-gray-300 light:text-gray-700">Agressivo</span>
                  <span className="text-sm font-bold dark:text-white light:text-gray-900">
                    {formatNumber(data.riskProfile.aggressive)}%
                  </span>
                </div>
                <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 rounded-full h-3"
                    style={{ width: `${data.riskProfile.aggressive}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Instituições Conectadas */}
        <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#FFC107]" />
              <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Instituições Conectadas</h3>
            </div>
            <Button
              className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold flex items-center gap-2"
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Conectar Instituição
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {data.institutions.map((institution) => (
              <div key={institution.id} className="p-4 border dark:border-gray-700 light:border-gray-300 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold dark:text-white light:text-gray-900">{institution.name}</h4>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                    Conectada
                  </span>
                </div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-3">
                  {institution.accounts.length} conta{institution.accounts.length !== 1 ? "s" : ""}
                </p>
                <div className="space-y-2">
                  {institution.accounts.map((account) => (
                    <div key={account.id} className="text-sm">
                      <p className="dark:text-gray-300 light:text-gray-700">{account.name}</p>
                      <p className="text-[#FFC107]">{formatCurrency(account.balance)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Investimentos Detalhados */}
        <Card className="p-6 border-2 dark:border-gray-700 light:border-gray-300 dark:bg-gray-800 light:bg-gray-50">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-[#FFC107]" />
            <h3 className="text-lg font-bold dark:text-white light:text-gray-900">Seus Investimentos</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 light:border-gray-300">
                  <th className="text-left py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">Nome</th>
                  <th className="text-right py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">Qtd</th>
                  <th className="text-right py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">
                    Preço Unit.
                  </th>
                  <th className="text-right py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">
                    Valor Total
                  </th>
                  <th className="text-right py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">
                    Lucro/Prejuízo
                  </th>
                  <th className="text-right py-3 px-4 dark:text-gray-400 light:text-gray-600 font-semibold">%</th>
                </tr>
              </thead>
              <tbody>
                {data.investments.map((investment) => (
                  <tr
                    key={investment.id}
                    className="border-b dark:border-gray-700 light:border-gray-300 dark:hover:bg-gray-700/50 light:hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => setSelectedInvestment(investment)}
                  >
                    <td className="py-3 px-4 dark:text-white light:text-gray-900">{investment.name}</td>
                    <td className="text-right py-3 px-4 dark:text-gray-300 light:text-gray-700">
                      {formatNumber(investment.quantity, 4)}
                    </td>
                    <td className="text-right py-3 px-4 dark:text-gray-300 light:text-gray-700">
                      {formatCurrency(investment.currentPrice)}
                    </td>
                    <td className="text-right py-3 px-4 dark:text-white light:text-gray-900 font-semibold">
                      {formatCurrency(investment.currentValue)}
                    </td>
                    <td
                      className={`text-right py-3 px-4 font-semibold ${
                        investment.profitLoss >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      <div className="flex items-center justify-end gap-1">
                        {investment.profitLoss >= 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                        {formatCurrency(investment.profitLoss)}
                      </div>
                    </td>
                    <td
                      className={`text-right py-3 px-4 font-semibold ${
                        investment.profitLossPercentage >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {investment.profitLossPercentage > 0 ? "+" : ""}
                      {formatNumber(investment.profitLossPercentage)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Alertas e Oportunidades */}
        {data.alerts && <AlertsPanel alerts={data.alerts} />}

        {/* Recomendações Personalizadas */}
        {data.recommendations && <RecommendationsPanel recommendations={data.recommendations} />}

        {/* Simulador de Migração */}
        <MigrationSimulator />

        {/* Comparativa de Produtos */}
        {data.marketProducts && <ProductComparison products={data.marketProducts} />}

        {/* Relatórios e Projeções */}
        <ReportsPanel
          totalInvested={data.summary.totalInvested}
          totalValue={data.summary.totalCurrentValue}
          totalReturn={data.summary.totalProfitLoss}
        />

        {/* Detalhe do Investimento Selecionado */}
        {selectedInvestment && (
          <Card className="p-6 border-2 border-[#FFC107] dark:bg-gray-800 light:bg-gray-50 mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold dark:text-white light:text-gray-900">{selectedInvestment.name}</h3>
              <button
                onClick={() => setSelectedInvestment(null)}
                className="dark:text-gray-400 light:text-gray-600 dark:hover:text-white light:hover:text-gray-900 transition"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Quantidade</p>
                <p className="text-2xl font-bold dark:text-white light:text-gray-900">
                  {formatNumber(selectedInvestment.quantity, 4)}
                </p>
              </div>
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Preço Atual</p>
                <p className="text-2xl font-bold dark:text-white light:text-gray-900">
                  {formatCurrency(selectedInvestment.currentPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Valor Total</p>
                <p className="text-2xl font-bold dark:text-white light:text-gray-900">
                  {formatCurrency(selectedInvestment.currentValue)}
                </p>
              </div>
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Preço de Compra</p>
                <p className="text-lg dark:text-gray-300 light:text-gray-700">
                  {formatCurrency(selectedInvestment.purchasePrice)}
                </p>
              </div>
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Data de Compra</p>
                <p className="text-lg dark:text-gray-300 light:text-gray-700">
                  {new Date(selectedInvestment.purchaseDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Rentabilidade</p>
                <p
                  className={`text-lg font-bold ${
                    selectedInvestment.profitLossPercentage >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedInvestment.profitLossPercentage > 0 ? "+" : ""}
                  {formatNumber(selectedInvestment.profitLossPercentage)}%
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t dark:border-gray-700 light:border-gray-300">
              <p className="text-sm dark:text-gray-400 light:text-gray-600 mb-2">Lucro/Prejuízo Total</p>
              <p
                className={`text-3xl font-bold ${
                  selectedInvestment.profitLoss >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {selectedInvestment.profitLoss >= 0 ? "+" : ""}
                {formatCurrency(selectedInvestment.profitLoss)}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
