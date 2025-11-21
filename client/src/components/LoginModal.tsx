import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Validação básica
      if (!email || !password) {
        setError("Por favor, preencha todos os campos")
        return
      }

      // Permitir email normal ou "admin" como email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== "admin") {
        setError("Por favor, insira um email válido")
        return
      }

      // Chamar função de login do context
      await login(email, password)

      // Fechar modal após sucesso
      setEmail("")
      setPassword("")
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login. Tente novamente.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Conectar-se</DialogTitle>
          <DialogDescription>
            Faça login na sua conta para acessar a plataforma
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo de Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                disabled={isLoading}
                className="w-full pl-10 pr-10 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-700/50 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Botões */}
          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFC107] text-black hover:bg-[#FFB800] font-semibold h-11 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? "Conectando..." : "Conectar"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="w-full dark:border-gray-700 light:border-gray-300 dark:text-gray-300 light:text-gray-700 dark:hover:bg-gray-800 light:hover:bg-gray-50 h-11 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Cancelar
            </Button>
          </div>

          {/* Link para Cadastro */}
          <div className="text-center text-sm dark:text-gray-400 light:text-gray-600">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#FFC107] hover:underline font-medium"
            >
              Criar conta
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
