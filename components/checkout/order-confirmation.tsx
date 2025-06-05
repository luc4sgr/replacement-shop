"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, Clock, Phone, MapPin } from "lucide-react"

interface OrderConfirmationProps {
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

export function OrderConfirmation({ onSubmit, onBack, isSubmitting }: OrderConfirmationProps) {
  const { state } = useCart()

  if (!state.contactData) {
    return <div>Erro: Dados de contato não encontrados</div>
  }

  const criticalItems = state.items.filter((item) => item.urgency === "critical")
  const uniqueMachines = new Set(state.items.map((item) => item.machineId)).size

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Pronto para Enviar sua Solicitação!</h3>
        <p className="text-slate-600">Revise os dados abaixo e confirme o envio. Você receberá uma cópia por email.</p>
      </div>

      {/* Contact Data Summary */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-4">
        <h4 className="font-semibold text-slate-900">Dados de Contato</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{state.contactData.fullName}</p>
              <p className="text-slate-600">{state.contactData.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">{state.contactData.email}</p>
              <p className="text-slate-600">Email principal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">{state.contactData.phone}</p>
              <p className="text-slate-600">Telefone</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium">
                {state.contactData.city}, {state.contactData.state}
              </p>
              <p className="text-slate-600">CEP: {state.contactData.zipCode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Resumo da Solicitação</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-blue-700">Solicitações:</span>
            <p className="font-semibold text-blue-900">{state.items.length}</p>
          </div>
          <div>
            <span className="text-blue-700">Máquinas:</span>
            <p className="font-semibold text-blue-900">{uniqueMachines}</p>
          </div>
          <div>
            <span className="text-blue-700">Urgências Críticas:</span>
            <p className="font-semibold text-blue-900 text-red-600">{criticalItems.length}</p>
          </div>
          <div>
            <span className="text-blue-700">Resposta em:</span>
            <p className="font-semibold text-blue-900">{criticalItems.length > 0 ? "2-4 horas" : "12-24 horas"}</p>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />O que acontece agora?
        </h4>
        <div className="space-y-2 text-sm text-green-800">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <p>Sua solicitação será enviada para nossa equipe técnica especializada</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <p>Você receberá uma confirmação por email em alguns minutos</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <p>
              Nossa equipe analisará suas necessidades e preparará um orçamento detalhado
              {criticalItems.length > 0 ? " em até 4 horas" : " em até 24 horas"}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold">4</span>
            </div>
            <p>Você receberá o orçamento completo com preços, prazos e disponibilidade</p>
          </div>
        </div>
      </div>

      {/* Preferences Summary */}
      {(state.contactData.maxBudget || state.contactData.desiredDeadline || state.contactData.preferCertified) && (
        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-slate-900 mb-3">Suas Preferências</h4>
          <div className="space-y-2 text-sm">
            {state.contactData.maxBudget && (
              <div className="flex justify-between">
                <span className="text-slate-600">Orçamento máximo:</span>
                <span className="font-medium">{state.contactData.maxBudget}</span>
              </div>
            )}
            {state.contactData.desiredDeadline && (
              <div className="flex justify-between">
                <span className="text-slate-600">Prazo desejado:</span>
                <span className="font-medium">{state.contactData.desiredDeadline}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600">Peças certificadas:</span>
              <Badge variant={state.contactData.preferCertified ? "default" : "secondary"}>
                {state.contactData.preferCertified ? "Preferencial" : "Não obrigatório"}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting} className="flex-1">
          Voltar
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Enviando Solicitação...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Confirmar e Enviar
            </>
          )}
        </Button>
      </div>

      {/* Success State */}
      {isSubmitting && (
        <div className="text-center py-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-600">Processando sua solicitação... Você será redirecionado em breve.</p>
        </div>
      )}
    </div>
  )
}
