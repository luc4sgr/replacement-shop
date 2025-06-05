"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const machines = [
  {
    id: 1,
    name: "Moinho de Bolas MB-2000",
    category: "Moinhos Industriais",
    image: "/placeholder.svg?height=300&width=400",
    description: "Moinho de bolas para processamento de materiais industriais com alta eficiência.",
    specifications: ["Capacidade: 2000kg/h", "Potência: 150HP", "Ano: 2020-2024"],
    status: "Disponível",
    number: "01",
  },
  {
    id: 2,
    name: "Guilhotina Industrial GI-3000",
    category: "Equipamentos de Corte",
    image: "/placeholder.svg?height=300&width=400",
    description: "Guilhotina de alta precisão para cortes industriais de grande porte.",
    specifications: ["Corte: 3000mm", "Força: 200 ton", "Ano: 2019-2024"],
    status: "Disponível",
    number: "02",
  },
  {
    id: 3,
    name: "Filtro de Manga FM-500",
    category: "Sistemas de Filtração",
    image: "/placeholder.svg?height=300&width=400",
    description: "Sistema de filtração por manga para controle de particulados.",
    specifications: ["Vazão: 500m³/min", "Eficiência: 99.9%", "Ano: 2021-2024"],
    status: "Limitado",
    number: "03",
  },
  {
    id: 4,
    name: "Cilindro Hidráulico CH-1000",
    category: "Sistemas Hidráulicos",
    image: "/placeholder.svg?height=300&width=400",
    description: "Cilindro hidráulico de alta pressão para aplicações industriais.",
    specifications: ["Pressão: 350 bar", "Curso: 1000mm", "Ano: 2022-2024"],
    status: "Disponível",
    number: "04",
  },
  {
    id: 5,
    name: "Transportador Helicoidal TH-800",
    category: "Transportadores",
    image: "/placeholder.svg?height=300&width=400",
    description: "Transportador helicoidal para movimentação de materiais granulados.",
    specifications: ["Capacidade: 800 ton/h", "Comprimento: 15m", "Ano: 2023-2024"],
    status: "Disponível",
    number: "05",
  },
  {
    id: 6,
    name: "Serra Circular SC-1200",
    category: "Equipamentos de Corte",
    image: "/placeholder.svg?height=300&width=400",
    description: "Serra circular industrial para corte de madeiras de grande porte.",
    specifications: ["Diâmetro: 1200mm", "Corte máx: 400mm", "Ano: 2021-2024"],
    status: "Limitado",
    number: "06",
  },
]

export function FeaturedMachines() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const visibleMachines = 3
  const maxIndex = Math.max(0, machines.length - visibleMachines)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 4000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isAutoplay, currentIndex])

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoplay(false)
  const handleMouseLeave = () => setIsAutoplay(true)

  return (
    <section className="py-0 bg-white relative overflow-hidden">
      <div className="flex min-h-screen relative">
        {/* Left Red Section */}
        <div className="w-1/4 bg-red-600 relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-red-800 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-red-400 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Right Dark Section */}
        <div className="flex-1 bg-slate-900 relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-slate-700 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-slate-600 rounded-full animate-pulse delay-2000"></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10">
          {/* Header Section with Navigation */}
          <div className="flex items-center pt-20 pb-8">
            <div className="w-1/4 flex justify-center">
              {/* Left Arrow on Red Section */}
              <Button
                onClick={prevSlide}
                className="w-16 h-16 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-xl transform hover:scale-110 transition-all duration-200"
                size="icon"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            </div>

            <div className="flex-1 px-8">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 text-red-400 mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="uppercase text-sm font-semibold tracking-wider">Nosso Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                      Máquinas em Destaque
                    </h2>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-3xl">
                      Explore nossa seleção de máquinas industriais mais procuradas e encontre as peças que você
                      precisa.
                    </p>
                  </div>

                  {/* Right Arrow aligned with title */}
                  <div className="hidden lg:block">
                    <Button
                      onClick={nextSlide}
                      className="w-16 h-16 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-xl transform hover:scale-110 transition-all duration-200"
                      size="icon"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="px-8 pb-20">
            <div
              className="relative overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={carouselRef}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleMachines)}%)` }}
              >
                {machines.map((machine, index) => (
                  <div key={machine.id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] p-3">
                    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden h-full flex flex-col group max-w-sm mx-auto">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <Image
                          src={machine.image || "/placeholder.svg"}
                          alt={machine.name}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Status Badge */}
                        {/* <Badge
                          className={`absolute top-3 left-3 ${
                            machine.status === "Disponível"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-yellow-500 hover:bg-yellow-600"
                          } text-white font-semibold px-2 py-1 text-xs`}
                        >
                          {machine.status}
                        </Badge> */}

                        {/* Number Badge */}
                        {/* <div className="absolute bottom-3 left-3 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {machine.number}
                        </div> */}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-3">
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-200 bg-red-50 font-medium text-xs"
                          >
                            {machine.category}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                          {machine.name}
                        </h3>

                        <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow line-clamp-3">
                          {machine.description}
                        </p>

                        {/* Specifications */}
                        <div className="space-y-1 mb-4">
                          {machine.specifications.slice(0, 2).map((spec, index) => (
                            <div key={index} className="flex items-center text-xs text-slate-500">
                              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                              {spec}
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <Button
                          asChild
                          className="w-full bg-slate-900 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                        >
                          <Link href={`/machines/${machine.id}`} className="flex items-center justify-center">
                            Solicitar Peças
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-red-500 w-8" : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link href="/machines" className="flex items-center">
                  Ver Todas as Máquinas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 lg:hidden z-20">
          <Button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
            size="icon"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
            size="icon"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
