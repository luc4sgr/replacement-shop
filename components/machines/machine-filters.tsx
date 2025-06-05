"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw, Filter } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { mainCategories, categoryColors, type Machine } from "./machines-catalog"

interface MachineFiltersProps {
  machines: Machine[]
  onFilter: (filtered: Machine[]) => void
  searchTerm: string
}

interface FilterState {
  categories: string[]
  years: number[]
}

export function MachineFilters({ machines, onFilter, searchTerm }: MachineFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    years: [2015, 2024],
  })

  const [openSections, setOpenSections] = useState({
    categories: true,
    years: true,
  })

  useEffect(() => {
    applyFilters()
  }, [filters, machines, searchTerm])

  const applyFilters = () => {
    let filtered = machines

    // Apply search term (only for machine name)
    if (searchTerm) {
      filtered = filtered.filter((machine) => machine.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((machine) => filters.categories.includes(machine.category))
    }

    // Apply year filter
    filtered = filtered.filter((machine) => machine.year >= filters.years[0] && machine.year <= filters.years[1])

    onFilter(filtered)
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      years: [2015, 2024],
    })
  }

  const getActiveFiltersCount = () => {
    return filters.categories.length + (filters.years[0] !== 2015 || filters.years[1] !== 2024 ? 1 : 0)
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Count machines per category
  const getCategoryCount = (category: string) => {
    return machines.filter((machine) => machine.category === category).length
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-slate-500" />
          Filtros
        </h3>
        {getActiveFiltersCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
            <RotateCcw className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge
                key={category}
                className={`flex items-center gap-1 border ${categoryColors[category] || "bg-gray-100 text-gray-800 border-gray-200"}`}
              >
                {category}
                <X className="w-3 h-3 cursor-pointer" onClick={() => handleCategoryChange(category, false)} />
              </Badge>
            ))}
            {(filters.years[0] !== 2015 || filters.years[1] !== 2024) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.years[0]} - {filters.years[1]}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setFilters((prev) => ({ ...prev, years: [2015, 2024] }))}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Categories */}
        <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
          <div className="border-b pb-2 mb-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <h4 className="font-medium text-slate-900">Categorias</h4>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <span className="sr-only">Toggle</span>
                <ChevronIcon open={openSections.categories} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 pt-2">
            {mainCategories.map((category) => (
              <div key={category} className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm text-slate-700 flex items-center flex-1">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${categoryColors[category]?.split(" ")[0] || "bg-gray-400"}`}
                    ></span>
                    {category}
                  </Label>
                </div>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {getCategoryCount(category)}
                </span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Year Range */}
        <Collapsible open={openSections.years} onOpenChange={() => toggleSection("years")}>
          <div className="border-b pb-2 mb-2">
            <CollapsibleTrigger className="flex w-full items-center justify-between">
              <h4 className="font-medium text-slate-900">
                Ano de Fabricação ({filters.years[0]} - {filters.years[1]})
              </h4>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <span className="sr-only">Toggle</span>
                <ChevronIcon open={openSections.years} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-4">
            <Slider
              value={filters.years}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, years: value }))}
              min={2015}
              max={2024}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>2015</span>
              <span>2024</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180 transform" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
