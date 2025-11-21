import { ArrowRightLeft, TrendingUp, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MigrationSimulatorProps {
  onSimulate?: (from: string, to: string, amount: number) => void
}

export function MigrationSimulator({ onSimulate }: MigrationSimulatorProps) {
  const [selectedFrom, setSelectedFrom] = useState("cdb")
  const [selectedTo, setSelectedTo] = useState("cdb-novo")
  const [amount, setAmount] = useState(10000)
  const [showResults, setShowResults] = useState(false)

  // Dados mockados de produtos
  const products: Record<string, { name: string; return: number; fees: number }> = {
    cdb: { name: "CDB Itaú 110% CDI", return: 9.2, fees: 0 },
    "cdb-novo": { name: "CDB Bradesco 115% CDI", return: 9.7, fees: 0 },
    fundo: { name: "Fundo Renda Fixa VGIR11", return: 7.5, fees: 0.5 },
    tesouro: { name: "Tesouro IPCA+ 2035", return: 7.8, fees: 0 },
    fii: { name: "FII HGLG11", return: 8.5, fees: 0.2 },
  }

  const handleSimulate = () => {
    setShowResults(true)
    if (onSimulate) {
      onSimulate(selectedFrom, selectedTo, amount)
    }
  }

  const fromProduct = products[selectedFrom]
  const toProduct = products[selectedTo]

  if (!fromProduct || !toProduct) {
    return null
  }

  // Cálculos
  const currentMonthly = (amount * fromProduct.return) / 100 / 12
  const newMonthly = (amount * toProduct.return) / 100 / 12
  const monthlyGain = newMonthly - currentMonthly
  const monthlyGainPercent = ((monthlyGain / currentMonthly) * 100).toFixed(2)
  const breakEvenMonths = monthlyGain > 0 ? Math.ceil((fromProduct.fees * 12) / monthlyGain) : 0
  const gain1Year = monthlyGain * 12 - fromProduct.fees * 12
  const gain5Years = monthlyGain * 12 * 5 - fromProduct.fees * 12 * 5

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Card className="p-6 border-2 border-gray-700 light:border-gray-300 bg-gray-800 light:bg-gray-50 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-[#FFC107]" />
        <h3 className="text-lg font-bold text-white light:text-gray-900">Simulador de Migração</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Coluna 1: Seleção */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-300 light:text-gray-700 mb-2">
              Migrar de:
            </label>
            <select
              value={selectedFrom}
              onChange={(e) => setSelectedFrom(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 light:bg-white border border-gray-600 light:border-gray-300 rounded text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
            >
              {Object.entries(products).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
              Rentabilidade: <span className="text-green-400 font-bold">{fromProduct.return}% a.a.</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 light:text-gray-700 mb-2">
              Para:
            </label>
            <select
              value={selectedTo}
              onChange={(e) => setSelectedTo(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 light:bg-white border border-gray-600 light:border-gray-300 rounded text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
            >
              {Object.entries(products).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
              Rentabilidade: <span className="text-green-400 font-bold">{toProduct.return}% a.a.</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 light:text-gray-700 mb-2">
              Valor a Migrar:
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 light:bg-white border border-gray-600 light:border-gray-300 rounded text-white light:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
            />
            <p className="text-xs text-gray-400 light:text-gray-600 mt-2">{formatCurrency(amount)}</p>
          </div>

          <Button
            onClick={handleSimulate}
            className="w-full bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold"
          >
            Simular
          </Button>
        </div>

        {/* Coluna 2: Comparação */}
        <div className="space-y-4">
          {/* De */}
          <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg border-l-4 border-gray-600 light:border-gray-400">
            <p className="text-xs text-gray-400 light:text-gray-600 mb-2">SITUAÇÃO ATUAL</p>
            <p className="text-lg font-bold text-white light:text-gray-900 mb-2">{formatCurrency(amount)}</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300 light:text-gray-700">
                Renda Mensal:{" "}
                <span className="text-[#FFC107] font-semibold">{formatCurrency(currentMonthly)}</span>
              </p>
              <p className="text-xs text-gray-300 light:text-gray-700">
                Renda Anual:{" "}
                <span className="text-[#FFC107] font-semibold">
                  {formatCurrency(currentMonthly * 12)}
                </span>
              </p>
            </div>
          </div>

          {/* Seta */}
          <div className="flex justify-center">
            <ArrowRightLeft className="w-5 h-5 text-[#FFC107]" />
          </div>

          {/* Para */}
          <div
            className={`p-4 rounded-lg border-l-4 ${
              monthlyGain > 0
                ? "bg-green-900/20 light:bg-green-50 border-green-500"
                : "bg-red-900/20 light:bg-red-50 border-red-500"
            }`}
          >
            <p className="text-xs text-gray-400 light:text-gray-600 mb-2">APÓS MIGRAÇÃO</p>
            <p className="text-lg font-bold text-white light:text-gray-900 mb-2">{formatCurrency(amount)}</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300 light:text-gray-700">
                Renda Mensal:{" "}
                <span
                  className={`font-semibold ${
                    monthlyGain > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(newMonthly)}
                </span>
              </p>
              <p className="text-xs text-gray-300 light:text-gray-700">
                Renda Anual:{" "}
                <span
                  className={`font-semibold ${
                    monthlyGain > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(newMonthly * 12)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Coluna 3: Resultados */}
        {showResults && (
          <div className="space-y-4">
            {/* Ganho Mensal */}
            <div className="p-4 bg-gradient-to-br from-green-900/30 light:from-green-50 to-transparent rounded-lg border-2 border-green-500/30 light:border-green-200">
              <p className="text-xs text-gray-400 light:text-gray-600 mb-2">GANHO MENSAL ADICIONAL</p>
              <p className={`text-2xl font-bold ${monthlyGain > 0 ? "text-green-400" : "text-red-400"}`}>
                {monthlyGain > 0 ? "+" : ""}{formatCurrency(monthlyGain)}
              </p>
              <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
                {monthlyGain > 0 ? "+" : ""}{monthlyGainPercent}% de aumento
              </p>
            </div>

            {/* Break-even */}
            <div className="p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-400 light:text-gray-600 mb-2">PAYBACK</p>
              <p className="text-lg font-bold text-white light:text-gray-900">
                {breakEvenMonths > 0 ? breakEvenMonths : "Imediato"}
              </p>
              <p className="text-xs text-gray-400 light:text-gray-600">
                {breakEvenMonths > 0 ? "meses para compensar" : "Sem custos de migração"}
              </p>
            </div>

            {/* Ganho em 1 ano */}
            <div className="p-4 bg-gradient-to-br from-blue-900/30 light:from-blue-50 to-transparent rounded-lg border-2 border-blue-500/30 light:border-blue-200">
              <p className="text-xs text-gray-400 light:text-gray-600 mb-2">GANHO TOTAL (1 ANO)</p>
              <p className={`text-2xl font-bold ${gain1Year > 0 ? "text-blue-400" : "text-red-400"}`}>
                {gain1Year > 0 ? "+" : ""}{formatCurrency(gain1Year)}
              </p>
            </div>

            {/* Ganho em 5 anos */}
            <div className="p-4 bg-gradient-to-br from-purple-900/30 light:from-purple-50 to-transparent rounded-lg border-2 border-purple-500/30 light:border-purple-200">
              <p className="text-xs text-gray-400 light:text-gray-600 mb-2">GANHO TOTAL (5 ANOS)</p>
              <p className={`text-2xl font-bold ${gain5Years > 0 ? "text-purple-400" : "text-red-400"}`}>
                {gain5Years > 0 ? "+" : ""}{formatCurrency(gain5Years)}
              </p>
            </div>

            {monthlyGain > 0 && (
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                <TrendingUp className="w-4 h-4 mr-2" />
                Realizar Migração
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
