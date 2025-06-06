"use client"

import { useState } from "react"
import { MachineFilters } from "./machine-filters"
import { MachineGrid } from "./machine-grid"
import { MachineSearch } from "./machine-search"

export interface Machine {
  id: number
  name: string
  category: string // Categoria principal
  brand: string
  model: string
  year: number
  power: string
  image: string
  description: string
  specifications: string[]
  isFavorite: boolean
  tags: string[] // Mantido apenas para compatibilidade, mas não usado nos filtros
}

// Categorias principais do sistema
export const mainCategories = [
  "Recepção",
  "Limpeza",
  "Moagem",
  "Mistura",
  "Ensacamento",
  "Transportadores",
  "Armazenagem",
  "Aspiração e Pneumático",
  "Aparelho Magnético",
  "Farelo e Impurezas",
  "Arroz e Milho",
]

// Cores para as categorias
export const categoryColors: Record<string, string> = {
  Recepção: "bg-blue-100 text-blue-800 border-blue-200",
  Limpeza: "bg-green-100 text-green-800 border-green-200",
  Moagem: "bg-red-100 text-red-800 border-red-200",
  Mistura: "bg-purple-100 text-purple-800 border-purple-200",
  Ensacamento: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Transportadores: "bg-orange-100 text-orange-800 border-orange-200",
  Armazenagem: "bg-teal-100 text-teal-800 border-teal-200",
  "Aspiração e Pneumático": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Aparelho Magnético": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Farelo e Impurezas": "bg-amber-100 text-amber-800 border-amber-200",
  "Arroz e Milho": "bg-lime-100 text-lime-800 border-lime-200",
}

const mockMachines: Machine[] = [
  {
    id: 1,
    name: "Moinho de Bolas MB-2000",
    category: "Moagem",
    brand: "TechMill",
    model: "MB-2000",
    year: 2022,
    power: "150HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Moinho de bolas para processamento de materiais industriais com alta eficiência e durabilidade.",
    specifications: ["Capacidade: 2000kg/h", "Potência: 150HP", "Diâmetro: 2.5m", "Peso: 15 ton"],
    isFavorite: false,
    tags: ["Arroz e Milho"],
  },
  {
    id: 2,
    name: "Guilhotina Industrial GI-3000",
    category: "Limpeza",
    brand: "CutPro",
    model: "GI-3000",
    year: 2021,
    power: "75HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Guilhotina de alta precisão para cortes industriais de grande porte com sistema CNC.",
    specifications: ["Corte máximo: 3000mm", "Força: 200 ton", "Precisão: ±0.1mm", "Peso: 8 ton"],
    isFavorite: true,
    tags: ["Farelo e Impurezas"],
  },
  {
    id: 3,
    name: "Filtro de Manga FM-500",
    category: "Aspiração e Pneumático",
    brand: "FilterMax",
    model: "FM-500",
    year: 2023,
    power: "25HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Sistema de filtração por manga para controle eficiente de particulados industriais.",
    specifications: ["Vazão: 500m³/min", "Eficiência: 99.9%", "Área filtrante: 200m²", "Peso: 3 ton"],
    isFavorite: false,
    tags: ["Limpeza"],
  },
  {
    id: 4,
    name: "Cilindro Hidráulico CH-1000",
    category: "Aparelho Magnético",
    brand: "HydroPower",
    model: "CH-1000",
    year: 2020,
    power: "100HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cilindro hidráulico de alta pressão para aplicações industriais pesadas.",
    specifications: ["Pressão: 350 bar", "Curso: 1000mm", "Diâmetro: 200mm", "Peso: 2.5 ton"],
    isFavorite: false,
    tags: ["Mistura"],
  },
  {
    id: 5,
    name: "Transportador Helicoidal TH-800",
    category: "Transportadores",
    brand: "ConveyTech",
    model: "TH-800",
    year: 2022,
    power: "50HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Transportador helicoidal para movimentação de materiais granulados e em pó.",
    specifications: ["Capacidade: 800 ton/h", "Comprimento: 15m", "Diâmetro: 400mm", "Peso: 4 ton"],
    isFavorite: false,
    tags: ["Armazenagem"],
  },
  {
    id: 6,
    name: "Serra Circular SC-1200",
    category: "Limpeza",
    brand: "SawMaster",
    model: "SC-1200",
    year: 2019,
    power: "120HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Serra circular industrial para corte de madeiras de grande porte com alta precisão.",
    specifications: ["Diâmetro lâmina: 1200mm", "Corte máximo: 400mm", "Velocidade: 3000 RPM", "Peso: 6 ton"],
    isFavorite: false,
    tags: ["Farelo e Impurezas"],
  },
  {
    id: 7,
    name: "Elevador de Canecas EC-500",
    category: "Transportadores",
    brand: "ElevaTech",
    model: "EC-500",
    year: 2023,
    power: "30HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Elevador de canecas para transporte vertical de grãos e materiais granulados.",
    specifications: ["Capacidade: 500 ton/h", "Altura: 25m", "Velocidade: 2.5 m/s", "Peso: 5 ton"],
    isFavorite: false,
    tags: ["Arroz e Milho", "Recepção"],
  },
  {
    id: 8,
    name: "Silo de Armazenagem SA-10000",
    category: "Armazenagem",
    brand: "StoragePro",
    model: "SA-10000",
    year: 2021,
    power: "5HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Silo metálico para armazenagem de grãos com sistema de aeração e monitoramento de temperatura.",
    specifications: ["Capacidade: 10000 ton", "Diâmetro: 15m", "Altura: 20m", "Peso: 25 ton"],
    isFavorite: false,
    tags: ["Arroz e Milho"],
  },
  {
    id: 9,
    name: "Ensacadeira Automática EA-100",
    category: "Ensacamento",
    brand: "PackTech",
    model: "EA-100",
    year: 2022,
    power: "10HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ensacadeira automática para produtos granulados com sistema de pesagem eletrônica.",
    specifications: ["Capacidade: 100 sacos/h", "Peso: 1.5 ton", "Precisão: ±0.1%", "Tamanho de saco: 10-50kg"],
    isFavorite: false,
    tags: ["Arroz e Milho"],
  },
  {
    id: 10,
    name: "Separador Magnético SM-200",
    category: "Aparelho Magnético",
    brand: "MagTech",
    model: "SM-200",
    year: 2023,
    power: "5HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Separador magnético para remoção de partículas metálicas em fluxos de grãos.",
    specifications: ["Capacidade: 200 ton/h", "Campo magnético: 10000 Gauss", "Peso: 0.8 ton"],
    isFavorite: false,
    tags: ["Limpeza", "Arroz e Milho"],
  },
  {
    id: 11,
    name: "Misturador Horizontal MH-500",
    category: "Mistura",
    brand: "MixTech",
    model: "MH-500",
    year: 2021,
    power: "40HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Misturador horizontal para homogeneização de rações e produtos granulados.",
    specifications: ["Capacidade: 500kg/lote", "Tempo de mistura: 3-5min", "Peso: 2 ton"],
    isFavorite: false,
    tags: ["Farelo e Impurezas"],
  },
  {
    id: 12,
    name: "Compressor de Ar CA-100",
    category: "Aspiração e Pneumático",
    brand: "AirTech",
    model: "CA-100",
    year: 2022,
    power: "100HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Compressor de ar industrial para sistemas pneumáticos de alta demanda.",
    specifications: ["Capacidade: 100 m³/min", "Pressão: 10 bar", "Peso: 1.2 ton"],
    isFavorite: false,
    tags: [],
  },
  {
    id: 13,
    name: "Balança Rodoviária BR-80",
    category: "Recepção",
    brand: "WeighTech",
    model: "BR-80",
    year: 2023,
    power: "2HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Balança rodoviária para pesagem de caminhões e controle de recepção de grãos.",
    specifications: ["Capacidade: 80 ton", "Precisão: ±20kg", "Plataforma: 18m x 3m", "Peso: 12 ton"],
    isFavorite: false,
    tags: ["Arroz e Milho"],
  },
  {
    id: 14,
    name: "Peneira Vibratória PV-300",
    category: "Limpeza",
    brand: "CleanTech",
    model: "PV-300",
    year: 2022,
    power: "15HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Peneira vibratória para separação e limpeza de grãos e materiais granulados.",
    specifications: ["Capacidade: 300 ton/h", "Área de peneiramento: 6m²", "Vibração: 1800 RPM", "Peso: 3.5 ton"],
    isFavorite: false,
    tags: ["Farelo e Impurezas", "Arroz e Milho"],
  },
  {
    id: 15,
    name: "Moinho de Martelos MM-1500",
    category: "Moagem",
    brand: "HammerTech",
    model: "MM-1500",
    year: 2023,
    power: "200HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Moinho de martelos para trituração de grãos e materiais diversos com alta capacidade.",
    specifications: ["Capacidade: 1500kg/h", "Potência: 200HP", "Rotação: 3600 RPM", "Peso: 8 ton"],
    isFavorite: false,
    tags: ["Farelo e Impurezas"],
  },
  {
    id: 16,
    name: "Misturador Vertical MV-800",
    category: "Mistura",
    brand: "VertMix",
    model: "MV-800",
    year: 2022,
    power: "60HP",
    image: "/placeholder.svg?height=300&width=400",
    description: "Misturador vertical para homogeneização de ingredientes em lotes de grande volume.",
    specifications: ["Capacidade: 800kg/lote", "Tempo de mistura: 2-4min", "Altura: 4m", "Peso: 3.5 ton"],
    isFavorite: false,
    tags: ["Arroz e Milho"],
  },
]

// export function MachinesCatalog() {
//   const [machines, setMachines] = useState<Machine[]>(mockMachines)
//   const [filteredMachines, setFilteredMachines] = useState<Machine[]>(mockMachines)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

//   const handleSearch = (term: string) => {
//     setSearchTerm(term)
//     filterMachines(term, machines)
//   }

//   const handleFilter = (filtered: Machine[]) => {
//     setFilteredMachines(filtered)
//   }

//   const filterMachines = (term: string, machineList: Machine[]) => {
//     if (!term) {
//       setFilteredMachines(machineList)
//       return
//     }

//     const filtered = machineList.filter((machine) => machine.name.toLowerCase().includes(term.toLowerCase()))
//     setFilteredMachines(filtered)
//   }

//   const toggleFavorite = (id: number) => {
//     const updated = machines.map((machine) =>
//       machine.id === id ? { ...machine, isFavorite: !machine.isFavorite } : machine,
//     )
//     setMachines(updated)
//     filterMachines(searchTerm, updated)
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold text-slate-900 mb-4">Catálogo de Máquinas Industriais</h1>
//           <p className="text-xl text-slate-600">Encontre a máquina ideal e solicite as peças que você precisa</p>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="container mx-auto px-4 py-6">
//         <MachineSearch
//           onSearch={handleSearch}
//           resultsCount={filteredMachines.length}
//           viewMode={viewMode}
//           onViewModeChange={setViewMode}
//         />
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 pb-12">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-80">
//             <MachineFilters machines={machines} onFilter={handleFilter} searchTerm={searchTerm} />
//           </div>

//           {/* Machines Grid */}
//           <div className="flex-1">
//             <MachineGrid machines={filteredMachines} viewMode={viewMode} onToggleFavorite={toggleFavorite} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
export function MachinesCatalog() {
  const [machines, setMachines] = useState<Machine[]>(mockMachines)
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>(mockMachines)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterMachines(term, machines)
  }

  const handleFilter = (filtered: Machine[]) => {
    setFilteredMachines(filtered)
  }

  const filterMachines = (term: string, machineList: Machine[]) => {
    if (!term) {
      setFilteredMachines(machineList)
      return
    }

    const filtered = machineList.filter((machine) =>
      machine.name.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredMachines(filtered)
  }

  const toggleFavorite = (id: number) => {
    const updated = machines.map((machine) =>
      machine.id === id ? { ...machine, isFavorite: !machine.isFavorite } : machine,
    )
    setMachines(updated)
    filterMachines(searchTerm, updated)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Catálogo de Máquinas Industriais</h1>
          <p className="text-xl text-slate-600">Encontre a máquina ideal e solicite as peças que você precisa</p>
        </div>
      </div>

      {/* Search (agora também recebe machines, onFilter e searchTerm) */}
      <div className="container mx-auto px-4 py-6">
        <MachineSearch
          onSearch={handleSearch}
          resultsCount={filteredMachines.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          machines={machines}
          onFilter={handleFilter}
          searchTerm={searchTerm}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - oculto em telas menores */}
          <div className="hidden lg:block lg:w-80">
            <MachineFilters machines={machines} onFilter={handleFilter} searchTerm={searchTerm} />
          </div>

          {/* Machines Grid */}
          <div className="flex-1">
            <MachineGrid machines={filteredMachines} viewMode={viewMode} onToggleFavorite={toggleFavorite} />
          </div>
        </div>
      </div>
    </div>
  )
}