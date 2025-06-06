"use client"

import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

const urgencyOptions = {
  low: { label: "Baixa", color: "bg-green-100 text-green-800", icon: "🟢" },
  medium: { label: "Média", color: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  high: { label: "Alta", color: "bg-orange-100 text-orange-800", icon: "🟠" },
  critical: { label: "Crítica", color: "bg-red-100 text-red-800", icon: "🔴" },
}

export function OrderReview() {
  const { state, removeItem } = useCart()

  const criticalItems = state.items.filter((item) => item.urgency === "critical")
  const uniqueMachines = new Set(state.items.map((item) => item.machineId)).size

  return (
    <div className="space-y-6">
      {/* Summary Alert */}
      {criticalItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-900">Atenção: Solicitações Críticas</span>
          </div>
          <p className="text-sm text-red-800">
            Você tem {criticalItems.length} solicitação(ões) marcada(s) como crítica(s). Estas receberão prioridade no
            atendimento.
          </p>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Suas Solicitações ({state.items.length})</h3>
          <Badge variant="outline">
            {uniqueMachines} máquina{uniqueMachines !== 1 ? "s" : ""}
          </Badge>
        </div>

        {state.items.map((item, index) => (
          <div key={item.id}>
            <div className="bg-slate-50 rounded-lg p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={item.machineImage || "/placeholder.svg"}
                      alt={item.machineName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900">{item.machineName}</h4>
                    <p className="text-sm text-slate-600">
                      {item.machineBrand} • {item.machineModel}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {/* <Badge variant="outline" className={`text-xs ${urgencyOptions[item.urgency].color}`}>
                        {urgencyOptions[item.urgency].icon} {urgencyOptions[item.urgency].label}
                      </Badge> */}
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(item.addedAt, { addSuffix: true, locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Machine Details */}
              {(item.serialNumber || item.manufacturingYear || item.operatingHours) && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {item.serialNumber && (
                    <div>
                      <span className="text-slate-500">Série:</span>
                      <p className="font-medium">{item.serialNumber}</p>
                    </div>
                  )}
                  {item.manufacturingYear && (
                    <div>
                      <span className="text-slate-500">Ano:</span>
                      <p className="font-medium">{item.manufacturingYear}</p>
                    </div>
                  )}
                  {item.operatingHours && (
                    <div>
                      <span className="text-slate-500">Horas:</span>
                      <p className="font-medium">{item.operatingHours}h</p>
                    </div>
                  )}
                </div>
              )}

              {/* Categories */}
              <div>
                <span className="text-sm font-medium text-slate-700">Categorias de Peças:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.partCategories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <span className="text-sm font-medium text-slate-700">Descrição do Problema:</span>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.problemDescription}</p>
              </div>

              {/* Attachments */}
              {item.attachments.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-slate-700">Anexos:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.attachments.map((file, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        📎 {file.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {index < state.items.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Resumo da Solicitação</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Total de Solicitações:</span>
            <p className="font-semibold text-blue-900">{state.items.length}</p>
          </div>
          <div>
            <span className="text-blue-700">Máquinas Diferentes:</span>
            <p className="font-semibold text-blue-900">{uniqueMachines}</p>
          </div>
          {/* <div>
            <span className="text-blue-700">Urgências Críticas:</span>
            <p className="font-semibold text-blue-900">{criticalItems.length}</p>
          </div> */}
          <div>
            <span className="text-blue-700">Tempo de Resposta:</span>
            <p className="font-semibold text-blue-900">{criticalItems.length > 0 ? "2-4 horas" : "12-24 horas"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
