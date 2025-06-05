"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Machine } from "./machines-catalog"
import { categoryColors } from "./machines-catalog"

interface MachineGridProps {
  machines: Machine[]
  viewMode: "grid" | "list"
  onToggleFavorite: (id: number) => void
}

export function MachineGrid({ machines, viewMode, onToggleFavorite }: MachineGridProps) {
  if (machines.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400">⚙️</div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">Nenhuma máquina encontrada</h3>
        <p className="text-sm sm:text-base text-slate-600 px-4">
          Tente ajustar os filtros ou termos de busca para encontrar o que procura.
        </p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image */}
              <div className="relative w-full sm:w-48 md:w-64 h-48 sm:h-auto">
                <Image src={machine.image || "/placeholder.svg"} alt={machine.name} fill className="object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                  <div className="mb-3 sm:mb-0">
                    <Badge
                      className={`mb-2 text-xs border ${categoryColors[machine.category] || "bg-gray-100 text-gray-800 border-gray-200"}`}
                    >
                      {machine.category}
                    </Badge>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{machine.name}</h3>
                    <p className="text-slate-600 text-sm">
                      {machine.brand} • {machine.model}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {machine.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {machine.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <p className="text-slate-600 mb-3 sm:mb-4 text-sm leading-relaxed line-clamp-2">
                  {machine.description}
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {machine.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    {machine.power}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {machine.specifications.slice(0, 2).map((spec, index) => (
                      <span key={index} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-sm"
                  >
                    <Link href={`/machines/${machine.id}`}>
                      Solicitar Peças
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {machines.map((machine) => (
        <div
          key={machine.id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative overflow-hidden">
            <Image
              src={machine.image || "/placeholder.svg"}
              alt={machine.name}
              width={400}
              height={250}
              className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="mb-3">
              <Badge
                className={`text-xs border ${categoryColors[machine.category] || "bg-gray-100 text-gray-800 border-gray-200"}`}
              >
                {machine.category}
              </Badge>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-1">{machine.name}</h3>

            <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm text-slate-500">
              <span className="truncate">{machine.brand}</span>
              <span>•</span>
              <span className="truncate">{machine.model}</span>
              <span>•</span>
              <span>{machine.year}</span>
            </div>

            {/* Tags */}
            {machine.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {machine.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-2">{machine.description}</p>

            {/* Quick Specs */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span className="truncate">{machine.power}</span>
              </div>
            </div>

            {/* Specifications Preview */}
            <div className="space-y-1 mb-4 sm:mb-6">
              {machine.specifications.slice(0, 2).map((spec, index) => (
                <div key={index} className="text-xs text-slate-500 line-clamp-1">
                  • {spec}
                </div>
              ))}
              {machine.specifications.length > 2 && (
                <div className="text-xs text-slate-400">+{machine.specifications.length - 2} mais especificações</div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-sm"
            >
              <Link href={`/machines/${machine.id}`}>
                Solicitar Peças
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
