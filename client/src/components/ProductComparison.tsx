import { Filter, Download, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MarketProduct } from "@/types/dashboard"
import { useState } from "react"

interface ProductComparisonProps {
  products: MarketProduct[]
}

export function ProductComparison({ products }: ProductComparisonProps) {
  // 1. Inicialize com "todos" para bater com a lógica do filtro

  const [selectedType, setSelectedType] = useState<string>("todos")
  const [sortBy, setSortBy] = useState<"return" | "rating" | "liquidity">("return")

  if (!products) {
    return null
  }

  // 2. Lógica de Filtro
  const filteredProducts = products.filter((product) => {
    if (selectedType === "todos") return true
    
    const type = product.type ? product.type.toLowerCase() : ''
    
    if (selectedType === "acoes") return type === "stock" || type === "acao"
    if (selectedType === "fis") return type === "fii"
    if (selectedType === "fundos") return type === "funds" || type === "fundo"
    if (selectedType === "tesouro") return type === "treasury" || type === "tesouro"
    if (selectedType === "cripto") return type === "crypto" || type === "cripto"
    
    // Para 'cdb' e outros que batem direto
    return type === selectedType
  })

  // 3. Lógica de Ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "return") {
      return (Number(b.returnValue) || 0) - (Number(a.returnValue) || 0)
    } else if (sortBy === "rating") {
      return (Number(b.rating) || 0) - (Number(a.rating) || 0)
    } else if (sortBy === "liquidity") {
       return (a.liquidity || "").localeCompare(b.liquidity || "")
    }
    return 0
  })

  // 4. Listas e Helpers
  const types = ["todos", "cdb", "tesouro", "fundos", "fis", "acoes", "cripto"]

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      todos: "Todos",
      cdb: "CDB",
      tesouro: "Tesouro Direto",
      fundos: "Fundos",
      acoes: "Ações",
      fis: "FIIs",
      cripto: "Cripto"
    }
    return labels[type] || type
  }

  const getRiskColor = (risk: string) => {
    const r = risk ? risk.toLowerCase() : ''
    if (r === 'baixo') return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (r === 'médio' || r === 'medio') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const getLiquidityLabel = (liquidity: string) => {
    if (!liquidity) return 'N/A';
    
    const labels: Record<string, string> = {
      'diária': 'Diária',
      'imediata': 'Imediata',
      'no maturity': 'No Vencimento', 
      'no vencimento': 'No Vencimento',
      'd+0': 'D+0 (Imediata)',
      'd+1': 'D+1'
    }
    
    return labels[liquidity.toLowerCase()] || liquidity
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // 5. O HTML (JSX) - Isto é o que exibe o card na tela
  return (
    <Card className="p-6 border-2 border-gray-700 light:border-gray-300 bg-gray-800 light:bg-gray-50 mb-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Download className="w-5 h-5 text-[#FFC107]" />
          <h3 className="text-lg font-bold text-white light:text-gray-900">Melhores Produtos do Mercado</h3>
        </div>
        <Button size="sm" variant="outline" className="border-gray-700 light:border-gray-300 text-gray-300 light:text-gray-700">
          Atualizar dados
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-900 light:bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 light:text-gray-600" />
          <span className="text-sm text-gray-400 light:text-gray-600 font-semibold">Tipo:</span>
        </div>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              selectedType === type
                ? "bg-[#FFC107] text-black"
                : "bg-gray-700 light:bg-gray-200 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-300"
            }`}
          >
            {getTypeLabel(type)}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-400 light:text-gray-600 font-semibold">Ordenar por:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 rounded text-xs bg-gray-700 light:bg-white text-white light:text-gray-900 border-0 light:border light:border-gray-300 focus:ring-2 focus:ring-[#FFC107]"
          >
            <option value="return">Maior Rentabilidade</option>
            <option value="rating">Melhor Avaliação</option>
            <option value="liquidity">Liquidez</option>
          </select>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.length > 0 ? (
           sortedProducts.slice(0, 9).map((product) => (
          <div
            key={product.id}
            className="p-4 border-2 border-gray-700 light:border-gray-300 rounded-lg bg-gray-900/50 light:bg-white hover:border-[#FFC107]/50 transition flex flex-col"
          >
            {/* Header do Card */}
            <div className="mb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-white light:text-gray-900 text-sm line-clamp-1" title={product.name}>
                     {product.name}
                  </h4>
                  <p className="text-xs text-gray-400 light:text-gray-600">{product.institution}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating || 4)
                          ? "fill-[#FFC107] text-[#FFC107]"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Rentabilidade */}
            <div className="bg-gradient-to-r from-green-900/20 light:from-green-50 to-transparent p-3 rounded mb-3">
              <p className="text-xs text-gray-400 light:text-gray-600 mb-1">Rentabilidade</p>
              <p className="text-xl font-bold text-green-400">
                {product.returnValue}%{" "}
                <span className="text-sm text-gray-400 light:text-gray-600">
                  {product.returnType === "indice" ? "CDI" : "a.a."}
                </span>
              </p>
            </div>

            {/* Informações */}
            <div className="space-y-2 mb-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 light:text-gray-600">Mín. Aplicação:</span>
                <span className="text-white light:text-gray-900 font-semibold">{formatCurrency(product.minInvestment)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 light:text-gray-600">Liquidez:</span>
                <span className="text-white light:text-gray-900 font-semibold">{getLiquidityLabel(product.liquidity)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 light:text-gray-600">Risco:</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${getRiskColor(
                    product.riskLevel
                  )}`}
                >
                  {(product.riskLevel || 'médio').toUpperCase()}
                </span>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-auto pt-3 border-t border-gray-700 light:border-gray-300">
              <Button
                size="sm"
                className="w-full bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold text-xs"
              >
                Investir Agora
              </Button>
            </div>
          </div>
        ))
       ) : (
          <div className="col-span-3 text-center py-10 text-gray-500">
            Nenhum produto encontrado.
          </div>
       )}
      </div>

      {sortedProducts.length > 9 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            className="border-gray-700 light:border-gray-300 text-gray-300 light:text-gray-700 hover:bg-gray-800 light:hover:bg-gray-100"
          >
            Ver Todos ({sortedProducts.length})
          </Button>
        </div>
      )}
    </Card>
  )
}