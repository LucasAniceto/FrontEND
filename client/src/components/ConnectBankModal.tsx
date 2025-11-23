import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Building2, Loader2 } from "lucide-react"
import { investmentService } from "@/services/investmentService"
import type { Account, Institution } from "@/types/dashboard"

interface ConnectBankModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void 
  connectedAccounts: Account[]
}

export function ConnectBankModal({ isOpen, onClose, onSuccess, connectedAccounts }: ConnectBankModalProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)

  // 1. Buscar lista de bancos ao abrir
  useEffect(() => {
    if (isOpen) {
      const fetchInstitutions = async () => {
        try {
          setLoading(true) // <--- 1. Começa a carregar
          const data = await investmentService.getInstitutions()
          setInstitutions(data)
        } catch (error) {
          console.error("Erro ao buscar instituições:", error)
        } finally {
          setLoading(false) // <--- 2. Terminou (seja sucesso ou erro)
        }
      }
      fetchInstitutions()
    }
  }, [isOpen])

  // 2. Função de Conectar
  const handleConnect = async (institutionId: string) => {
    setConnectingId(institutionId)
    try {
      await investmentService.connectInstitution({ 
        institutionId: institutionId,
        accessToken: "dummy" 
      })
      
      // Sucesso!
      onSuccess() 
      onClose()
    } catch (error: any) {
      console.error("Erro ao conectar:", error)
      alert("Erro ao conectar. Tente novamente.")
    } finally {
      setConnectingId(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Conectar Instituição</DialogTitle>
          <DialogDescription>
            Escolha um banco para importar seus dados via Open Finance.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {institutions.map((inst: any) => {
            // 3. VERIFICAÇÃO: O banco já está conectado?
            // (Verifica se existe alguma conta com o mesmo nome de instituição)
            const isConnected = connectedAccounts.some((acc: any) => acc.institution === inst.name)

            return (
              <div
                key={inst.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-4">
                  {/* ... ícone e nome ... */}
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{inst.name}</p>
                    <p className="text-sm text-gray-500">
                       {isConnected ? 'Conectado' : 'Disponível'}
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleConnect(inst.id)}
                  disabled={!!connectingId}
                  variant={isConnected ? "secondary" : "outline"} 
                >
                  {connectingId === inst.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isConnected ? (
                    "Sincronizar" 
                  ) : (
                    "Conectar"
                  )}
                </Button>
            </div>
          )})}
          
          {loading ? (
        <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-500">Carregando bancos...</span>
        </div>
        ) : institutions.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Nenhum banco encontrado.</p>
        ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}