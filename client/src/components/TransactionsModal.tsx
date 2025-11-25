import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Loader2, ArrowUpCircle, ArrowDownCircle, Calendar } from "lucide-react"
import { investmentService } from "@/services/investmentService"
import { formatters } from "@/lib/formatters"

interface TransactionsModalProps {
  isOpen: boolean
  onClose: () => void
  account: {
    localId: string
    institution: string
    type: string
    balance: number
  } | null
}

export function TransactionsModal({ isOpen, onClose, account }: TransactionsModalProps) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen && account?.localId) {
      const fetchTransactions = async () => {
        try {
          setLoading(true)
          setError("")
          const data = await investmentService.getAccountTransactions(account.localId)
          setTransactions(data)
        } catch (err) {
          console.error("Erro ao buscar extrato:", err)
          setError("Não foi possível carregar o extrato. Verifique sua conexão ou consentimento.")
        } finally {
          setLoading(false)
        }
      }

      fetchTransactions()
    }
  }, [isOpen, account])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Extrato - {account?.institution}
          </DialogTitle>
          <DialogDescription>
            {account?.type === 'checking' ? 'Conta Corrente' : account?.type} • Saldo: <span className="text-[#FFC107] font-bold">{account ? formatters.currency(account.balance) : ''}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 mt-4 space-y-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p>Buscando transações...</p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-900/20 border border-red-800/50 rounded text-red-400 text-center">
              {error}
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-800 rounded-lg">
              <p>Nenhuma transação encontrada para este período.</p>
            </div>
          ) : (
            transactions.map((txn) => (
              <div 
                key={txn._id} 
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-full ${
                    txn.type === 'credit' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {txn.type === 'credit' ? <ArrowUpCircle className="w-5 h-5" /> : <ArrowDownCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white text-gray-900">{txn.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      {formatters.date(txn.date)} • {txn.category}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    txn.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {txn.type === 'credit' ? '+' : '-'}{formatters.currency(txn.amount)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}