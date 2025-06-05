"use client"

import { useState } from "react"
import { Search, Grid, List, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MachineFilters } from "./machine-filters"

interface MachineSearchProps {
  onSearch: (term: string) => void
  resultsCount: number
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}

export function MachineSearch({ onSearch, resultsCount, viewMode, onViewModeChange }: MachineSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            placeholder="Buscar máquina pelo nome..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base border-slate-200 focus:border-red-500"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
          {/* Results Count */}
          <Badge variant="outline" className="text-slate-600 text-xs sm:text-sm">
            {resultsCount} máquinas encontradas
          </Badge>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Mode Toggle - Hidden on mobile */}
            <div className="hidden sm:flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="rounded-none px-3"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className="rounded-none px-3"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile View Mode Toggle */}
            <div className="flex sm:hidden border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="rounded-none px-2"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className="rounded-none px-2"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="p-6 h-full overflow-auto">
                  <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                  <MachineFilters
                    machines={[]} // Placeholder, will be replaced in actual implementation
                    onFilter={() => {}} // Placeholder
                    searchTerm={searchTerm}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  )
}
