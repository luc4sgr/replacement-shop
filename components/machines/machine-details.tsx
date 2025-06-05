"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddToCartForm } from "./add-to-cart-form"
import { Heart, Share2, Download, Play, ArrowLeft, Calendar, Zap, MapPin, Tag } from "lucide-react"
import Link from "next/link"
import { categoryColors } from "./machines-catalog"

interface MachineDetailsProps {
  machineId: number
}

// Mock data - in real app this would come from API
const mockMachine = {
  id: 1,
  name: "Moinho de Bolas MB-2000",
  category: "Moagem",
  brand: "TechMill",
  model: "MB-2000",
  year: 2022,
  power: "150HP",
  images: [
    "/placeholder.svg?height=500&width=600",
    "/placeholder.svg?height=500&width=600",
    "/placeholder.svg?height=500&width=600",
    "/placeholder.svg?height=500&width=600",
  ],
  description:
    "Moinho de bolas industrial de alta performance, projetado para processamento eficiente de materiais em operações de mineração e beneficiamento. Equipado com tecnologia avançada de controle e monitoramento.",
  specifications: [
    "Capacidade de processamento: 2000kg/h",
    "Potência do motor: 150HP (112kW)",
    "Diâmetro interno: 2.5m",
    "Comprimento: 3.2m",
    "Peso operacional: 15 toneladas",
    "Velocidade de rotação: 18 RPM",
    "Material de construção: Aço carbono ASTM A36",
    "Revestimento interno: Borracha natural",
    "Sistema de lubrificação: Automático",
    "Controle de temperatura: Integrado",
  ],
  technicalData: {
    dimensions: "2.5m x 3.2m x 2.8m (D x L x H)",
    weight: "15.000 kg",
    power: "150 HP (112 kW)",
    voltage: "440V / 60Hz",
    efficiency: "92%",
    noiseLevel: "< 85 dB",
  },
  manuals: [
    { name: "Manual de Operação", size: "2.5 MB", type: "PDF" },
    { name: "Manual de Manutenção", size: "3.1 MB", type: "PDF" },
    { name: "Catálogo de Peças", size: "4.2 MB", type: "PDF" },
    { name: "Esquemas Elétricos", size: "1.8 MB", type: "PDF" },
  ],
  videos: [
    { title: "Operação do Moinho MB-2000", duration: "5:32" },
    { title: "Manutenção Preventiva", duration: "8:15" },
    { title: "Troca de Revestimentos", duration: "12:45" },
  ],
  isFavorite: false,
  tags: ["Arroz e Milho"],
}

export function MachineDetails({ machineId }: MachineDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(mockMachine.isFavorite)

  const machine = mockMachine // In real app, fetch by machineId

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
            <Link href="/" className="hover:text-red-600">
              Início
            </Link>
            <span>/</span>
            <Link href="/machines" className="hover:text-red-600">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-slate-900 truncate">{machine.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Machine Information */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-2 sm:mb-4 -ml-2">
              <Link href="/machines">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm sm:text-base">Voltar ao Catálogo</span>
              </Link>
            </Button>

            {/* Image Gallery */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={machine.images[selectedImage] || "/placeholder.svg"}
                  alt={machine.name}
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white p-2"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? "text-red-500 fill-current" : "text-slate-600"}`}
                    />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white p-2">
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                  </Button>
                </div> */}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {machine.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-red-500 ring-2 ring-red-200"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${machine.name} - Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Machine Info */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
              <div className="mb-4 sm:mb-6">
                <Badge
                  className={`mb-3 text-xs border ${categoryColors[machine.category] || "bg-gray-100 text-gray-800 border-gray-200"}`}
                >
                  {machine.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{machine.name}</h1>
                <div className="flex items-center gap-2 sm:gap-4 text-slate-600 text-sm sm:text-base">
                  <span className="font-medium">{machine.brand}</span>
                  <span>•</span>
                  <span>Modelo {machine.model}</span>
                </div>
              </div>

              {/* Tags */}
              {machine.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {machine.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-slate-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{machine.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                  <span className="text-slate-600">Ano: {machine.year}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                  <span className="text-slate-600">Potência: {machine.power}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                  <span className="text-slate-600">Origem: Nacional</span>
                </div>
              </div>

              {/* Tabs for detailed info */}
              {/* <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                  <TabsTrigger value="specifications" className="text-xs sm:text-sm">
                    Especificações
                  </TabsTrigger>
                  <TabsTrigger value="manuals" className="text-xs sm:text-sm">
                    Manuais
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="text-xs sm:text-sm">
                    Vídeos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specifications" className="mt-4 sm:mt-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Especificações Técnicas</h3>
                    <div className="grid gap-2 sm:gap-3">
                      {machine.specifications.map((spec, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="manuals" className="mt-4 sm:mt-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Documentação Técnica</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {machine.manuals.map((manual, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-slate-900 text-xs sm:text-sm truncate">
                                {manual.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {manual.type} • {manual.size}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs ml-2">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="mt-4 sm:mt-6">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Vídeos Técnicos</h3>
                    <div className="space-y-2 sm:space-y-3">
                      {machine.videos.map((video, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-slate-900 text-xs sm:text-sm truncate">
                                {video.title}
                              </div>
                              <div className="text-xs text-slate-500">Duração: {video.duration}</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs ml-2">
                            Assistir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs> */}
            </div>
          </div>

          {/* Right Column - Request Form */}
          <div className="xl:sticky xl:top-24 xl:h-fit">
            <AddToCartForm
              machine={{
                id: machine.id,
                name: machine.name,
                brand: machine.brand,
                model: machine.model,
                image: machine.images[0],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
