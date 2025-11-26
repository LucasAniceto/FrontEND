import { useAuth } from "@/contexts/AuthContext"
import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { MigrationSimulator } from "@/components/MigrationSimulator"

export default function Simulator() {
  const { isAuthenticated } = useAuth()
  const [, setLocation] = useLocation()

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 light:bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white light:text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="dark:text-gray-300 light:text-gray-700 mb-6">
            Você precisa estar logado para acessar o simulador
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
          <h1 className="dark:text-white light:text-gray-900 font-bold text-xl">Simulador de Migração</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Descrição */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold dark:text-white light:text-gray-900 mb-2">
            Simule a Migração dos Seus <span className="text-[#FFC107]">Investimentos</span>
          </h2>
          <p className="dark:text-gray-400 light:text-gray-600">
            Compare diferentes produtos de investimento e descubra quanto você pode ganhar migrando seus recursos.
          </p>
        </div>

        {/* Simulador */}
        <MigrationSimulator />

        {/* Informações Adicionais */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 dark:bg-gray-800 light:bg-gray-50 rounded-lg border-2 dark:border-gray-700 light:border-gray-300">
            <h3 className="text-lg font-bold dark:text-white light:text-gray-900 mb-3">
              💡 Como Funciona?
            </h3>
            <p className="text-sm dark:text-gray-400 light:text-gray-600">
              Selecione o investimento atual e o produto desejado, insira o valor e veja a comparação detalhada de rentabilidade.
            </p>
          </div>

          <div className="p-6 dark:bg-gray-800 light:bg-gray-50 rounded-lg border-2 dark:border-gray-700 light:border-gray-300">
            <h3 className="text-lg font-bold dark:text-white light:text-gray-900 mb-3">
              📊 Análise Completa
            </h3>
            <p className="text-sm dark:text-gray-400 light:text-gray-600">
              Veja ganhos mensais, período de payback e projeções de longo prazo para tomar a melhor decisão.
            </p>
          </div>

          <div className="p-6 dark:bg-gray-800 light:bg-gray-50 rounded-lg border-2 dark:border-gray-700 light:border-gray-300">
            <h3 className="text-lg font-bold dark:text-white light:text-gray-900 mb-3">
              🔒 Sem Compromisso
            </h3>
            <p className="text-sm dark:text-gray-400 light:text-gray-600">
              Esta é apenas uma simulação. Use as informações para planejar suas migrações com segurança.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
