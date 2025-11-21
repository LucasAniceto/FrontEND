import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User, Mail, Lock, FileText, Phone, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}

export function RegisterModal({ isOpen, onClose, onBackToLogin }: RegisterModalProps) {
  const { register, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [agreedTerms, setAgreedTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14)
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15)
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setFormData((prev) => ({
      ...prev,
      cpf: formatted,
    }))
    setError("")
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData((prev) => ({
      ...prev,
      phone: formatted,
    }))
    setError("")
  }

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "")
    if (cleanCPF.length !== 11) {
      return false
    }
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // Validações
      if (!formData.name.trim()) {
        setError("Por favor, insira seu nome completo")
        return
      }

      if (formData.name.trim().split(" ").length < 2) {
        setError("Por favor, insira seu nome completo (nome e sobrenome)")
        return
      }

      if (!formData.email) {
        setError("Por favor, insira seu email")
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError("Por favor, insira um email válido")
        return
      }

      if (!validateCPF(formData.cpf)) {
        setError("Por favor, insira um CPF válido")
        return
      }

      if (!formData.phone || formData.phone.replace(/\D/g, "").length < 10) {
        setError("Por favor, insira um telefone válido")
        return
      }

      if (formData.password.length < 8) {
        setError("A senha deve ter no mínimo 8 caracteres")
        return
      }

      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        setError("A senha deve conter letras maiúsculas, minúsculas e números")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não correspondem")
        return
      }

      if (!agreedTerms) {
        setError("Você deve aceitar os termos e condições")
        return
      }

      // Chamar função de registro do context
      await register(
        formData.name,
        formData.email,
        formData.cpf,
        formData.phone,
        formData.password
      )

      // Fechar modal após sucesso
      setFormData({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        password: "",
        confirmPassword: "",
      })
      setAgreedTerms(false)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Criar Conta</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar sua conta
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Nome */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              Nome Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="João Silva"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

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
                name="email"
                placeholder="seu.email@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

          {/* Campo de CPF */}
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              CPF
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="cpf"
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleCPFChange}
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>
          </div>

          {/* Campo de Telefone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handlePhoneChange}
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
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
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
            <p className="text-xs dark:text-gray-400 light:text-gray-600 mt-1">
              Mínimo 8 caracteres, letras maiúsculas, minúsculas e números
            </p>
          </div>

          {/* Campo de Confirmar Senha */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium dark:text-gray-300 light:text-gray-700">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full pl-10 pr-10 py-2.5 dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300 rounded-md dark:text-white light:text-gray-900 dark:placeholder-gray-500 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Checkbox de Termos */}
          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-1 w-4 h-4 accent-[#FFC107] dark:bg-gray-800 light:bg-white dark:border-gray-700 light:border-gray-300 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor="terms" className="text-sm dark:text-gray-400 light:text-gray-600 cursor-pointer">
              Aceito os{" "}
              <a href="#" className="text-[#FFC107] hover:underline">
                termos e condições
              </a>{" "}
              e a{" "}
              <a href="#" className="text-[#FFC107] hover:underline">
                política de privacidade
              </a>
            </label>
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
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
            <Button
              type="button"
              onClick={onBackToLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full dark:border-gray-700 light:border-gray-300 dark:text-gray-300 light:text-gray-700 dark:hover:bg-gray-800 light:hover:bg-gray-50 h-11 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Voltar para Login
            </Button>
          </div>

          {/* Link para Login */}
          <div className="text-center text-sm dark:text-gray-400 light:text-gray-600">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-[#FFC107] hover:underline font-medium"
            >
              Fazer login
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
