"use client"

import { useState } from "react"
import { useCart, type ContactData } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "./contact-form"
import { OrderReview } from "./order-review"
import { OrderConfirmation } from "./order-confirmation"
import { ArrowLeft, ShoppingCart, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const steps = [
  { id: 1, name: "Revisão", icon: ShoppingCart },
  { id: 2, name: "Contato", icon: User },
  { id: 3, name: "Confirmação", icon: CheckCircle },
]

export function CheckoutProcess() {
  const { state, setContactData, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Redirect if cart is empty
  if (state.items.length === 0 && currentStep === 1) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Carrinho Vazio</h1>
          <p className="text-slate-600 mb-6">
            Você precisa adicionar pelo menos uma solicitação de peça para continuar.
          </p>
          <Button asChild>
            <Link href="/machines">Explorar Máquinas</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleContactSubmit = (contactData: ContactData) => {
    setContactData(contactData)
    setCurrentStep(3)
  }

  const handleFinalSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call to send email
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would send the email with the order details
      console.log("Sending order email:", {
        items: state.items,
        contactData: state.contactData,
      })

      // Clear cart after successful submission
      clearCart()

      // Show success and redirect
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.error("Error submitting order:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/machines">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar às Máquinas
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Finalizar Solicitação</h1>
          <p className="text-slate-600">
            Revise suas solicitações e forneça seus dados de contato para receber o orçamento
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id ? "bg-red-600 border-red-600 text-white" : "border-slate-300 text-slate-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-red-600" : "text-slate-400"}`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-red-600" : "bg-slate-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Revisão das Solicitações</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderReview />
                  <div className="mt-6 pt-6 border-t">
                    <Button onClick={() => setCurrentStep(2)} className="w-full bg-red-600 hover:bg-red-700">
                      Continuar para Dados de Contato
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados de Contato</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm onSubmit={handleContactSubmit} onBack={() => setCurrentStep(1)} />
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirmação</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderConfirmation
                    onSubmit={handleFinalSubmit}
                    onBack={() => setCurrentStep(2)}
                    isSubmitting={isSubmitting}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Solicitações:</span>
                  <span className="font-medium">{state.items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Máquinas:</span>
                  <span className="font-medium">{new Set(state.items.map((item) => item.machineId)).size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Urgências críticas:</span>
                  <span className="font-medium text-red-600">
                    {state.items.filter((item) => item.urgency === "critical").length}
                  </span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-xs text-slate-600">
                    Você receberá um orçamento detalhado por email em até 24 horas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
