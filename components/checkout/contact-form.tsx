"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { ContactData } from "@/contexts/cart-context"

interface ContactFormProps {
  onSubmit: (data: ContactData) => void
  onBack: () => void
}

export function ContactForm({ onSubmit, onBack }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    state: "",
    zipCode: "",
    maxBudget: "",
    desiredDeadline: "",
    preferCertified: true,
  })

  const [errors, setErrors] = useState<Partial<ContactData>>({})

  const handleInputChange = (field: keyof ContactData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<ContactData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Nome é obrigatório"
    if (!formData.company.trim()) newErrors.company = "Empresa é obrigatória"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória"
    if (!formData.state.trim()) newErrors.state = "Estado é obrigatório"
    if (!formData.zipCode.trim()) newErrors.zipCode = "CEP é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Informações Pessoais</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Nome Completo *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Seu nome completo"
              className={errors.fullName ? "border-red-500" : ""}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <Label htmlFor="company">Empresa *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Nome da empresa"
              className={errors.company ? "border-red-500" : ""}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Contato</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="seu@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="whatsapp">WhatsApp (opcional)</Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Endereço</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="São Paulo"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <Label htmlFor="state">Estado *</Label>
            <Select onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                <SelectValue placeholder="UF" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AC">AC</SelectItem>
                <SelectItem value="AL">AL</SelectItem>
                <SelectItem value="AP">AP</SelectItem>
                <SelectItem value="AM">AM</SelectItem>
                <SelectItem value="BA">BA</SelectItem>
                <SelectItem value="CE">CE</SelectItem>
                <SelectItem value="DF">DF</SelectItem>
                <SelectItem value="ES">ES</SelectItem>
                <SelectItem value="GO">GO</SelectItem>
                <SelectItem value="MA">MA</SelectItem>
                <SelectItem value="MT">MT</SelectItem>
                <SelectItem value="MS">MS</SelectItem>
                <SelectItem value="MG">MG</SelectItem>
                <SelectItem value="PA">PA</SelectItem>
                <SelectItem value="PB">PB</SelectItem>
                <SelectItem value="PR">PR</SelectItem>
                <SelectItem value="PE">PE</SelectItem>
                <SelectItem value="PI">PI</SelectItem>
                <SelectItem value="RJ">RJ</SelectItem>
                <SelectItem value="RN">RN</SelectItem>
                <SelectItem value="RS">RS</SelectItem>
                <SelectItem value="RO">RO</SelectItem>
                <SelectItem value="RR">RR</SelectItem>
                <SelectItem value="SC">SC</SelectItem>
                <SelectItem value="SP">SP</SelectItem>
                <SelectItem value="SE">SE</SelectItem>
                <SelectItem value="TO">TO</SelectItem>
              </SelectContent>
            </Select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="zipCode">CEP *</Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              placeholder="01234-567"
              className={errors.zipCode ? "border-red-500" : ""}
            />
            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Preferências (Opcional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxBudget">Orçamento Máximo</Label>
            <Input
              id="maxBudget"
              value={formData.maxBudget}
              onChange={(e) => handleInputChange("maxBudget", e.target.value)}
              placeholder="R$ 10.000,00"
            />
          </div>
          <div>
            <Label htmlFor="desiredDeadline">Prazo Desejado</Label>
            <Input
              id="desiredDeadline"
              value={formData.desiredDeadline}
              onChange={(e) => handleInputChange("desiredDeadline", e.target.value)}
              placeholder="Ex: 15 dias"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preferCertified"
            checked={formData.preferCertified}
            onCheckedChange={(checked) => handleInputChange("preferCertified", checked as boolean)}
          />
          <Label htmlFor="preferCertified" className="text-sm">
            Prefiro peças certificadas/originais (pode afetar o preço)
          </Label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Voltar
        </Button>
        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
          Continuar
        </Button>
      </div>
    </form>
  )
}
