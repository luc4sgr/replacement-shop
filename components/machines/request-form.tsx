"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Upload, Clock, Shield, CheckCircle, X } from "lucide-react"

interface RequestFormProps {
  machine: {
    id: number
    name: string
    brand: string
    model: string
  }
}

interface FormData {
  // Machine Data
  serialNumber: string
  manufacturingYear: string
  operatingHours: string

  // Contact Data
  fullName: string
  company: string
  email: string
  phone: string
  whatsapp: string

  // Location
  city: string
  state: string
  zipCode: string

  // Parts Request
  partCategories: string[]
  problemDescription: string
  urgency: "low" | "medium" | "high" | "critical"
  attachments: File[]

  // Preferences
  maxBudget: string
  desiredDeadline: string
  preferCertified: boolean
}

const partCategories = [
  "Revestimentos e Blindagens",
  "Rolamentos e Mancais",
  "Motores e Redutores",
  "Sistemas Hidráulicos",
  "Componentes Elétricos",
  "Peças de Desgaste",
  "Filtros e Vedações",
  "Sensores e Instrumentação",
]

const urgencyOptions = [
  { value: "low", label: "Baixa", color: "bg-green-100 text-green-800", icon: "🟢" },
  { value: "medium", label: "Média", color: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  { value: "high", label: "Alta", color: "bg-orange-100 text-orange-800", icon: "🟠" },
  { value: "critical", label: "Crítica", color: "bg-red-100 text-red-800", icon: "🔴" },
]

export function RequestForm({ machine }: RequestFormProps) {
  const [formData, setFormData] = useState<FormData>({
    serialNumber: "",
    manufacturingYear: "",
    operatingHours: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    state: "",
    zipCode: "",
    partCategories: [],
    problemDescription: "",
    urgency: "medium",
    attachments: [],
    maxBudget: "",
    desiredDeadline: "",
    preferCertified: true,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const totalSteps = 4

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      partCategories: prev.partCategories.includes(category)
        ? prev.partCategories.filter((c) => c !== category)
        : [...prev.partCategories, category],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    // Handle success/error
  }

  const getEstimatedResponseTime = () => {
    switch (formData.urgency) {
      case "critical":
        return "2-4 horas"
      case "high":
        return "4-8 horas"
      case "medium":
        return "12-24 horas"
      case "low":
        return "24-48 horas"
      default:
        return "24 horas"
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Dados da Máquina</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="serialNumber" className="text-sm">
                    Número de Série/Matrícula *
                  </Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                    placeholder="Ex: MB2000-2022-001"
                    className="mt-1 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="manufacturingYear" className="text-sm">
                      Ano de Fabricação *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("manufacturingYear", value)}>
                      <SelectTrigger className="mt-1 text-sm">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 15 }, (_, i) => 2024 - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="operatingHours" className="text-sm">
                      Horas de Uso (opcional)
                    </Label>
                    <Input
                      id="operatingHours"
                      value={formData.operatingHours}
                      onChange={(e) => handleInputChange("operatingHours", e.target.value)}
                      placeholder="Ex: 15000"
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Dados de Contato</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm">
                    Nome Completo *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm">
                    Empresa *
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Nome da empresa"
                    className="mt-1 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      E-mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm">
                      Cidade *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="São Paulo"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm">
                      Estado *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="mt-1 text-sm">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        {/* Add more states */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="zipCode" className="text-sm">
                      CEP *
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="01234-567"
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Solicitação de Peças</h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <Label className="text-sm font-medium">Categorias de Peças Necessárias *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3">
                    {partCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={formData.partCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label htmlFor={category} className="text-xs sm:text-sm text-slate-700 leading-tight">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="problemDescription" className="text-sm">
                    Descrição do Problema *
                  </Label>
                  <Textarea
                    id="problemDescription"
                    value={formData.problemDescription}
                    onChange={(e) => handleInputChange("problemDescription", e.target.value)}
                    placeholder="Descreva detalhadamente o problema, sintomas observados, peças danificadas, etc."
                    rows={3}
                    className="mt-1 text-sm"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Urgência da Solicitação *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3">
                    {urgencyOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleInputChange("urgency", option.value)}
                        className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-left ${
                          formData.urgency === option.value
                            ? "border-red-500 bg-red-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{option.icon}</span>
                          <span className="font-medium text-xs sm:text-sm">{option.label}</span>
                        </div>
                        <div className="text-xs text-slate-600">Resposta em {getEstimatedResponseTime()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Anexos (opcional)</Label>
                  <div className="mt-2">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 sm:p-6 text-center hover:border-slate-400 transition-colors">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-slate-600 mb-2">
                        Arraste arquivos aqui ou clique para selecionar
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        className="text-xs sm:text-sm"
                      >
                        Selecionar Arquivos
                      </Button>
                    </div>

                    {formData.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm"
                          >
                            <span className="text-slate-700 truncate flex-1 mr-2">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-xs p-1 h-auto"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Preferências e Revisão</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="maxBudget" className="text-sm">
                      Orçamento Máximo (opcional)
                    </Label>
                    <Input
                      id="maxBudget"
                      value={formData.maxBudget}
                      onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                      placeholder="R$ 10.000,00"
                      className="mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="desiredDeadline" className="text-sm">
                      Prazo Desejado (opcional)
                    </Label>
                    <Input
                      id="desiredDeadline"
                      value={formData.desiredDeadline}
                      onChange={(e) => handleInputChange("desiredDeadline", e.target.value)}
                      placeholder="Ex: 15 dias"
                      className="mt-1 text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="preferCertified"
                    checked={formData.preferCertified}
                    onCheckedChange={(checked) => handleInputChange("preferCertified", checked)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="preferCertified" className="text-xs sm:text-sm leading-tight">
                    Prefiro peças certificadas/originais (pode afetar o preço)
                  </Label>
                </div>

                <Separator />

                {/* Summary */}
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                  <h4 className="font-medium text-slate-900 mb-3 text-sm sm:text-base">Resumo da Solicitação</h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div>
                      <strong>Máquina:</strong> {machine.name}
                    </div>
                    <div>
                      <strong>Empresa:</strong> {formData.company}
                    </div>
                    <div>
                      <strong>Contato:</strong> {formData.fullName} ({formData.email})
                    </div>
                    <div>
                      <strong>Categorias:</strong> {formData.partCategories.join(", ")}
                    </div>
                    <div>
                      <strong>Urgência:</strong> {urgencyOptions.find((o) => o.value === formData.urgency)?.label}
                    </div>
                    <div>
                      <strong>Tempo estimado de resposta:</strong> {getEstimatedResponseTime()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">{currentStep}</span>
          </div>
          <span className="text-sm sm:text-base">Solicitar Peças - {machine.name}</span>
        </CardTitle>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1.5 sm:h-2 mt-3 sm:mt-4">
          <div
            className="bg-red-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span className="text-xs">Máquina</span>
          <span className="text-xs">Contato</span>
          <span className="text-xs">Solicitação</span>
          <span className="text-xs">Revisão</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="text-sm"
          >
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              className="bg-red-600 hover:bg-red-700 text-sm"
            >
              Próximo
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-sm">
              {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              <div className="text-xs text-slate-600">
                Resposta em até
                <br />
                <strong>{getEstimatedResponseTime()}</strong>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <div className="text-xs text-slate-600">
                Peças com
                <br />
                <strong>Garantia</strong>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              <div className="text-xs text-slate-600">
                Suporte
                <br />
                <strong>Especializado</strong>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
