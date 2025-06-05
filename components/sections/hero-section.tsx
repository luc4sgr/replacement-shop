"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Search } from "lucide-react"
import Link from "next/link"

const buttonStyles = `
  .demo-button {
    --color: #ffffff;
    overflow: hidden;
    position: relative;
    z-index: 1;
    background: transparent;
    border: 2px solid #ffffff;
  }

  .demo-button::before {
    position: absolute;
    content: "";
    background: #ffffff;
    width: 150px;
    height: 200px;
    z-index: -1;
    border-radius: 50%;
    top: 100%;
    left: 100%;
    transition: 0.3s all;
  }

  .demo-button:hover {
    color: #1e293b !important;
    border-color: #ffffff;
  }

  .demo-button:hover::before {
    top: -30px;
    left: -30px;
  }
`

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: buttonStyles }} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-red-700 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div
              className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Solicite as peças que
                <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  você precisa aqui
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
                Garanta a operação contínua solicitando rapidamente as peças essenciais para as máquinas do seu moinho.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="/machines">
                    Explorar Catálogo
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="demo-button w-full sm:w-auto border-white text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-200 relative overflow-hidden"
                  asChild
                >
                  <a href="#demo-video" className="relative z-10">
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    Ver Demonstração
                  </a>
                </Button>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto px-4">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Busque por máquina, modelo ou código da peça..."
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base lg:text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <Button className="absolute right-1 sm:right-2 top-1 sm:top-2 bg-red-600 hover:bg-red-700 text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2">
                    Buscar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  )
}
