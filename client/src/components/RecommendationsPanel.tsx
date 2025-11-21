import { ArrowRight, Lightbulb, ShoppingCart, ArrowUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Recommendation } from "@/types/dashboard"

interface RecommendationsPanelProps {
  recommendations: Recommendation[]
}

export function RecommendationsPanel({ recommendations }: RecommendationsPanelProps) {
  if (!recommendations || recommendations.length === 0) {
    return null
  }

  const getRecommendationIcon = (type: Recommendation["type"]) => {
    switch (type) {
      case "migrar":
        return <ArrowRight className="w-5 h-5 text-blue-400" />
      case "comprar":
        return <ShoppingCart className="w-5 h-5 text-green-400" />
      case "aumentar":
        return <ArrowUp className="w-5 h-5 text-purple-400" />
    }
  }

  const getRecommendationLabel = (type: Recommendation["type"]) => {
    switch (type) {
      case "migrar":
        return "Migrar"
      case "comprar":
        return "Comprar"
      case "aumentar":
        return "Aumentar"
    }
  }

  const getRiskColor = (risk: Recommendation["riskLevel"]) => {
    switch (risk) {
      case "baixo":
        return "bg-green-500/20 text-green-400"
      case "médio":
        return "bg-yellow-500/20 text-yellow-400"
      case "alto":
        return "bg-red-500/20 text-red-400"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Card className="p-6 border-2 border-gray-700 light:border-gray-300 bg-gray-800 light:bg-gray-50 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-[#FFC107]" />
        <h3 className="text-lg font-bold text-white light:text-gray-900">Recomendações Personalizadas</h3>
        <span className="ml-auto bg-[#FFC107] text-black text-xs font-bold px-2 py-1 rounded-full">
          {recommendations.length}
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 border-2 border-gray-700 light:border-gray-300 rounded-lg bg-gray-900/50 light:bg-white hover:border-[#FFC107]/50 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                {getRecommendationIcon(rec.type)}
                <div>
                  <h4 className="font-bold text-white light:text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-400 light:text-gray-600">{rec.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${getRiskColor(rec.riskLevel)}`}>
                {rec.riskLevel === "baixo" ? "Baixo Risco" : rec.riskLevel === "médio" ? "Risco Médio" : "Alto Risco"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4 bg-gray-800 light:bg-gray-100 p-3 rounded">
              <div>
                <p className="text-xs text-gray-400 light:text-gray-600 mb-1">Instituição / Produto Atual</p>
                <p className="font-semibold text-white light:text-gray-900">{rec.institution}</p>
                <p className="text-sm text-gray-300 light:text-gray-700">{rec.currentReturn}% a.a.</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 light:text-gray-600 mb-1">Produto Recomendado</p>
                <p className="font-semibold text-white light:text-gray-900">{rec.product}</p>
                <p className="text-sm text-green-400">{rec.recommendedReturn}% a.a.</p>
              </div>
            </div>

            <div className="bg-green-900/20 light:bg-green-50 border border-green-500/30 light:border-green-200 p-3 rounded mb-4">
              <p className="text-sm text-green-400 font-semibold mb-1">Ganho Potencial Anual</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(rec.potentialGain)}</p>
              <p className="text-xs text-gray-400 light:text-gray-600 mt-1">{rec.reason}</p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold flex-1"
              >
                {getRecommendationLabel(rec.type)}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-700 light:border-gray-300 text-gray-300 light:text-gray-700 hover:bg-gray-800 light:hover:bg-gray-100 flex-1"
              >
                Detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
