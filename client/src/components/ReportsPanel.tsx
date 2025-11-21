import { TrendingUp, Download, Calendar, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ReportsPanelProps {
  totalInvested: number
  totalValue: number
  totalReturn: number
}

export function ReportsPanel({ totalInvested, totalValue, totalReturn }: ReportsPanelProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("12m")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Dados mockados de projeções
  const projections = {
    "6m": {
      months_6: totalValue * 1.06,
      months_12: totalValue * 1.12,
      years_5: totalValue * 1.45,
    },
    "12m": {
      months_6: totalValue * 1.06,
      months_12: totalValue * 1.12,
      years_5: totalValue * 1.45,
    },
  }

  const currentProjection = projections[selectedPeriod as keyof typeof projections]
  const monthlyAverage = totalReturn / 12

  return (
    <Card className="p-6 border-2 border-gray-700 light:border-gray-300 bg-gray-800 light:bg-gray-50 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-[#FFC107]" />
        <h3 className="text-lg font-bold text-white light:text-gray-900">Relatórios e Projeções</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {/* Resumo Atual */}
        <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-400 light:text-gray-600 mb-2">SALDO ATUAL</p>
          <p className="text-2xl font-bold text-white light:text-gray-900">{formatCurrency(totalValue)}</p>
          <p className="text-xs text-gray-400 light:text-gray-600 mt-2">Desde {formatCurrency(totalInvested)}</p>
        </div>

        {/* Retorno Anual */}
        <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-400 light:text-gray-600 mb-2">RETORNO ANUAL</p>
          <p className="text-2xl font-bold text-green-400">{formatCurrency(totalReturn)}</p>
          <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
            {((totalReturn / totalInvested) * 100).toFixed(2)}% a.a.
          </p>
        </div>

        {/* Retorno Mensal */}
        <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-400 light:text-gray-600 mb-2">RETORNO MENSAL</p>
          <p className="text-2xl font-bold text-[#FFC107]">{formatCurrency(monthlyAverage)}</p>
          <p className="text-xs text-gray-400 light:text-gray-600 mt-2">Média em 12 meses</p>
        </div>

        {/* Taxa Média */}
        <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-400 light:text-gray-600 mb-2">TAXA MÉDIA</p>
          <p className="text-2xl font-bold text-blue-400">
            {((totalReturn / totalValue) * 100).toFixed(2)}%
          </p>
          <p className="text-xs text-gray-400 light:text-gray-600 mt-2">Do total investido</p>
        </div>
      </div>

      {/* Projeções */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white light:text-gray-900">Projeções de Crescimento</h4>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 light:text-gray-600" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 bg-gray-700 light:bg-white border border-gray-600 light:border-gray-300 rounded text-xs text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
            >
              <option value="6m">Últimos 6 meses</option>
              <option value="12m">Últimos 12 meses</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* 6 Meses */}
          <div className="p-4 bg-gradient-to-br from-blue-900/20 light:from-blue-50 to-transparent rounded-lg border-2 border-blue-500/30 light:border-blue-200">
            <p className="text-xs text-gray-400 light:text-gray-600 mb-2">PROJEÇÃO 6 MESES</p>
            <p className="text-2xl font-bold text-blue-400">
              {formatCurrency(currentProjection.months_6)}
            </p>
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
              +{formatCurrency(currentProjection.months_6 - totalValue)} de ganho
            </p>
          </div>

          {/* 12 Meses */}
          <div className="p-4 bg-gradient-to-br from-green-900/20 light:from-green-50 to-transparent rounded-lg border-2 border-green-500/30 light:border-green-200">
            <p className="text-xs text-gray-400 light:text-gray-600 mb-2">PROJEÇÃO 12 MESES</p>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(currentProjection.months_12)}
            </p>
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
              +{formatCurrency(currentProjection.months_12 - totalValue)} de ganho
            </p>
          </div>

          {/* 5 Anos */}
          <div className="p-4 bg-gradient-to-br from-purple-900/20 light:from-purple-50 to-transparent rounded-lg border-2 border-purple-500/30 light:border-purple-200">
            <p className="text-xs text-gray-400 light:text-gray-600 mb-2">PROJEÇÃO 5 ANOS</p>
            <p className="text-2xl font-bold text-purple-400">
              {formatCurrency(currentProjection.years_5)}
            </p>
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
              +{formatCurrency(currentProjection.years_5 - totalValue)} de ganho
            </p>
          </div>
        </div>
      </div>

      {/* Recomendações do Relatório */}
      <div className="bg-gray-900 light:bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="text-sm font-bold text-white light:text-gray-900 mb-3">Recomendações Baseadas em Dados</h4>
        <ul className="space-y-2 text-sm text-gray-300 light:text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#FFC107] font-bold">•</span>
            <span>Sua carteira está 45% em renda fixa, considerando aumentar para 50% para mais estabilidade</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FFC107] font-bold">•</span>
            <span>Rentabilidade média de 12.4% a.a. está acima da média do mercado - parabéns!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#FFC107] font-bold">•</span>
            <span>Considere adicionar 5-10% em criptomoedas se tiver maior tolerância ao risco</span>
          </li>
        </ul>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3">
        <Button className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exportar Relatório em PDF
        </Button>
        <Button
          variant="outline"
          className="border-gray-700 light:border-gray-300 text-gray-300 light:text-gray-700 hover:bg-gray-800 light:hover:bg-gray-100 flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Histórico Completo
        </Button>
      </div>
    </Card>
  )
}
