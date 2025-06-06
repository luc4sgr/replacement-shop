// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { X, RotateCcw, Filter, ChevronRight } from "lucide-react"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { mainCategories, categoryColors, type Machine } from "./machines-catalog"

// interface MachineFiltersProps {
//   machines: Machine[]
//   onFilter: (filtered: Machine[]) => void
//   searchTerm: string
// }

// interface FilterState {
//   categories: string[]
//   years: number[]
// }

// export function MachineFilters({ machines, onFilter, searchTerm }: MachineFiltersProps) {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([])
//   const [filters, setFilters] = useState<FilterState>({
//     categories: [],
//     years: [2015, 2024],
//   })

//   const [openSections, setOpenSections] = useState({
//     categories: true,
//     years: true,
//   })

//   useEffect(() => {
//     applyFilters()
//   }, [filters, machines, searchTerm])

//   const applyFilters = () => {
//     let filtered = machines

//     // Apply search term (only for machine name)
//     if (searchTerm) {
//       filtered = filtered.filter((machine) => machine.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     }

//     // Apply category filter
//     if (filters.categories.length > 0) {
//       filtered = filtered.filter((machine) => filters.categories.includes(machine.category))
//     }

//     // Apply year filter
//     filtered = filtered.filter((machine) => machine.year >= filters.years[0] && machine.year <= filters.years[1])

//     onFilter(filtered)
//   }

//   const handleCategoryChange = (category: string, checked: boolean) => {
//     setFilters((prev) => ({
//       ...prev,
//       categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
//     }))
//   }

//   const clearAllFilters = () => {
//     setFilters({
//       categories: [],
//       years: [2015, 2024],
//     })
//   }

//   const getActiveFiltersCount = () => {
//     return filters.categories.length + (filters.years[0] !== 2015 || filters.years[1] !== 2024 ? 1 : 0)
//   }

//   const toggleSection = (section: keyof typeof openSections) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }))
//   }

//   // Count machines per category
//   const getCategoryCount = (category: string) => {
//     return machines.filter((machine) => machine.category === category).length
//   }
//   const categoryCounts = mainCategories.reduce(
//     (acc, category) => {
//       acc[category] = machines.filter((machine) => machine.category === category).length
//       return acc
//     },
//     {} as Record<string, number>,
//   )
//   const toggleCategory = (category: string) => {
//     const newSelected = selectedCategories.includes(category)
//       ? selectedCategories.filter((c) => c !== category)
//       : [...selectedCategories, category]

//     setSelectedCategories(newSelected)
//   }


//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold text-gray-900 mb-1">Categories</h2>
//         <div className="flex">
//           <div className="w-3 h-1 bg-black"></div>
//           <div className="w-10 h-h-1 bg-red-500 ml-1"></div>
//         </div>
//       </div>


//       <div className="space-y-1">
//         {mainCategories.map((category) => {
//           const count = categoryCounts[category] || 0
//           const isSelected = selectedCategories.includes(category)

//           return (
//             <button
//               key={category}
//               onClick={() => toggleCategory(category)}
//               className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-200 ${isSelected ? "bg-red-600 text-white" : "bg-white hover:bg-gray-50"
//                 }`}
//             >
//               <span className="font-medium">{category}</span>
//               <div className="flex items-center gap-2">
//                 {count > 0 && (
//                   <span className={`text-sm ${isSelected ? "text-white" : "text-gray-500"}`}>({count})</span>
//                 )}
//                 <ChevronRight className="h-4 w-4" />
//               </div>
//             </button>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { mainCategories, type Machine } from "./machines-catalog"

interface MachineFiltersProps {
  machines: Machine[]
  onFilter: (filtered: Machine[]) => void
  searchTerm: string
}

export function MachineFilters({ machines, onFilter, searchTerm }: MachineFiltersProps) {
  // Apenas categorias são usadas para filtragem aqui
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    applyFilters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, machines, searchTerm])

  const applyFilters = () => {
    let filtered = machines

    // Filtrar pelo termo de busca (nome da máquina)
    if (searchTerm) {
      filtered = filtered.filter((machine) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar pelas categorias selecionadas
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((machine) =>
        selectedCategories.includes(machine.category),
      )
    }

    onFilter(filtered)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Categories</h2>
        <div className="flex">
          <div className="w-3 h-1 bg-black"></div>
          <div className="w-10 h-1 bg-red-500 ml-1"></div>
        </div>
      </div>

      <div className="space-y-1">
        {mainCategories.map((category) => {
          const count = machines.filter((m) => m.category === category).length
          const isSelected = selectedCategories.includes(category)

          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-200 ${
                isSelected
                  ? "bg-red-600 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">{category}</span>
              <div className="flex items-center gap-2">
                {count > 0 && (
                  <span
                    className={`text-sm ${
                      isSelected ? "text-white" : "text-gray-500"
                    }`}
                  >
                    ({count})
                  </span>
                )}
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
