"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { Upload, ShoppingCart, CheckCircle, Clock, Shield } from "lucide-react"
import { toast } from "sonner"

interface AddToCartFormProps {
  machine: {
    id: number
    name: string
    brand: string
    model: string
    image: string
  }
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

export function AddToCartForm({ machine }: AddToCartFormProps) {
  const { addItem, openCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    serialNumberImage: null as File | null,
    manufacturingYear: "",
    operatingHours: "",
    partCategories: [] as string[],
    problemDescription: "",
  })

  const handleInputChange = (field: string, value: any) => {
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

  const handleAddToCart = async () => {
    // Validation
    if (formData.partCategories.length === 0) {
      toast.error("Selecione pelo menos uma categoria de peça")
      return
    }

    if (!formData.problemDescription.trim()) {
      toast.error("Descreva o problema encontrado")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addItem({
        machineId: machine.id,
        machineName: machine.name,
        machineBrand: machine.brand,
        machineModel: machine.model,
        machineImage: machine.image,
        partCategories: formData.partCategories,
        problemDescription: formData.problemDescription,
        urgency: "medium", // Default value for compatibility
        serialNumber: formData.serialNumberImage ? formData.serialNumberImage.name : undefined,
        manufacturingYear: formData.manufacturingYear,
        operatingHours: formData.operatingHours,
        attachments: [], // Empty array for compatibility
      })

      toast.success("Solicitação adicionada ao carrinho!", {
        description: "Continue navegando ou finalize sua solicitação",
        action: {
          label: "Ver Carrinho",
          onClick: () => openCart(),
        },
      })

      // Reset form
      setFormData({
        serialNumberImage: null,
        manufacturingYear: "",
        operatingHours: "",
        partCategories: [],
        problemDescription: "",
      })
    } catch (error) {
      toast.error("Erro ao adicionar ao carrinho")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          Solicitar Peças - {machine.name}
        </CardTitle>
        <p className="text-sm text-slate-600">
          Adicione esta solicitação ao carrinho e continue navegando por outras máquinas
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Machine Data (Optional) */}
        {/* <div className="space-y-4"> */}
          <h3 className="font-semibold text-slate-900">Dados da Máquina (Opcional)</h3>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> */}
            <div>
              <Label htmlFor="serialNumberImage" className="text-sm">
                Foto do Número de Série
              </Label>
              <div className="mt-1 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-slate-400 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-600 mb-2">Envie uma foto da placa de identificação</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleInputChange("serialNumberImage", e.target.files[0])
                    }
                  }}
                  className="hidden"
                  id="serial-number-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("serial-number-upload")?.click()}
                >
                  Selecionar Foto
                </Button>
                {formData.serialNumberImage && (
                  <div className="mt-2 text-xs text-green-600">✓ {formData.serialNumberImage.name}</div>
                )}
              </div>
            </div>
            {/* <div>
              <Label htmlFor="manufacturingYear" className="text-sm">
                Ano de Fabricação
              </Label>
              <Input
                id="manufacturingYear"
                value={formData.manufacturingYear}
                onChange={(e) => handleInputChange("manufacturingYear", e.target.value)}
                placeholder="Ex: 2022"
                className="mt-1"
              />
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Part Categories */}
        <div className="space-y-4">
          <Label className="font-semibold text-slate-900">Categorias de Peças Necessárias *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {partCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={formData.partCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={category} className="text-sm text-slate-700 leading-tight">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Description */}
        <div className="space-y-2">
          <Label htmlFor="problemDescription" className="font-semibold text-slate-900">
            Descrição do Problema *
          </Label>
          <Textarea
            id="problemDescription"
            value={formData.problemDescription}
            onChange={(e) => handleInputChange("problemDescription", e.target.value)}
            placeholder="Descreva detalhadamente o problema, sintomas observados, peças danificadas, etc."
            rows={4}
            className="resize-none"
          />
        </div>

        {/* Add to Cart Button */}
        <div className="space-y-4">
          <Button
            onClick={handleAddToCart}
            disabled={isSubmitting || formData.partCategories.length === 0 || !formData.problemDescription.trim()}
            className="w-full bg-red-600 hover:bg-red-700 py-3"
          >
            {isSubmitting ? (
              "Adicionando..."
            ) : (
              <>
                <ShoppingCart className="mr-2 w-4 h-4" />
                Adicionar ao Carrinho
              </>
            )}
          </Button>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <Clock className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <div className="text-xs text-slate-600">
              Resposta
              <br />
              <strong>Rápida</strong>
            </div>
          </div>
          <div className="text-center">
            <Shield className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-xs text-slate-600">
              Peças com
              <br />
              <strong>Garantia</strong>
            </div>
          </div>
          <div className="text-center">
            <CheckCircle className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xs text-slate-600">
              Suporte
              <br />
              <strong>Especializado</strong>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
