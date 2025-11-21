import { AlertCircle, TrendingUp, Info, Bell, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Alert } from "@/types/dashboard"

interface AlertsPanelProps {
  alerts: Alert[]
  onDismiss?: (alertId: string) => void
}

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  if (!alerts || alerts.length === 0) {
    return null
  }

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "opportunity":
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getAlertColor = (type: Alert["type"]) => {
    switch (type) {
      case "opportunity":
        return "border-green-500/20 light:border-green-200 bg-green-900/10 light:bg-green-50"
      case "warning":
        return "border-yellow-500/20 light:border-yellow-200 bg-yellow-900/10 light:bg-yellow-50"
      case "info":
        return "border-blue-500/20 light:border-blue-200 bg-blue-900/10 light:bg-blue-50"
    }
  }

  const getAlertTextColor = (type: Alert["type"]) => {
    switch (type) {
      case "opportunity":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "info":
        return "text-blue-400"
    }
  }

  return (
    <Card className="p-6 border-2 border-gray-700 light:border-gray-300 bg-gray-800 light:bg-gray-50 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-5 h-5 text-[#FFC107]" />
        <h3 className="text-lg font-bold text-white light:text-gray-900">Alertas e Oportunidades</h3>
        <span className="ml-auto bg-[#FFC107] text-black text-xs font-bold px-2 py-1 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-2 border-l-4 flex items-start justify-between ${getAlertColor(
              alert.type
            )}`}
          >
            <div className="flex items-start gap-3 flex-1">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <h4 className={`font-semibold ${getAlertTextColor(alert.type)}`}>
                  {alert.title}
                </h4>
                <p className="text-sm text-gray-300 light:text-gray-700 mt-1">{alert.message}</p>
                {alert.investmentName && (
                  <p className="text-xs text-gray-400 light:text-gray-600 mt-2">
                    <span className="font-semibold">Investimento:</span> {alert.investmentName}
                  </p>
                )}
                {alert.action && (
                  <button className="mt-2 text-xs font-semibold text-[#FFC107] hover:underline">
                    {alert.action.label} →
                  </button>
                )}
              </div>
            </div>
            {onDismiss && (
              <button
                onClick={() => onDismiss(alert.id)}
                className="text-gray-500 light:text-gray-400 hover:text-gray-300 light:hover:text-gray-600 transition ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
