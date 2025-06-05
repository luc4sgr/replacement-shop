"use client"

import { useEffect, useState } from "react"
import { Clock, Shield, Play, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const features = [
    {
        icon: Clock,
        title: "Resposta Rápida",
        description: "Orçamentos em até 24 horas",
    },
    {
        icon: Shield,
        title: "Qualidade Garantida",
        description: "Peças certificadas com garantia",
    },
]

const benefits = [
    "Atendimento personalizado e especializado",
    "Estoque completo de peças industriais",
    "Entrega expressa",
    "Suporte técnico 24/7 disponível",
]

export function About() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        const element = document.getElementById("value-proposition")
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <section id="value-proposition" className="py-0 bg-white relative overflow-hidden">
            {/* Mobile Layout (< lg) */}
            <div className="block lg:hidden">
                {/* Visual Section - Mobile/Tablet */}
                <div className="relative h-56 sm:h-72 md:h-80 bg-slate-100 overflow-hidden">
                    <div
                        className={`absolute inset-0 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-105" : "opacity-0 scale-100"
                            }`}
                    >
                        <Image
                            src="/bg-industria.jpg"
                            alt="Industrial facility"
                            fill
                            className="object-cover object-center animate-slow-zoom"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    {/* Play Button - Mobile/Tablet */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6">
                        <div
                            className={`transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                }`}
                        >
                            <Button
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-red-500 hover:bg-red-600 rounded-md sm:rounded-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                                size="icon"
                            >
                                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5" fill="white" />
                            </Button>
                            <p className="text-white font-semibold mt-1 text-center text-xs sm:text-sm">ASSISTIR</p>
                        </div>
                    </div>

                    {/* Decorative Elements - Mobile/Tablet */}
                    <div className="absolute top-0 right-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-red-500 via-red-600 to-red-700"></div>
                    <div className="absolute top-1/2 right-0 w-2 sm:w-3 h-16 sm:h-20 md:h-24 bg-red-500 transform -translate-y-1/2"></div>
                </div>

                {/* Content Section - Mobile/Tablet */}
                <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
                    <div
                        className={`transform transition-all duration-1000 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                            }`}
                    >
                        {/* Header - Mobile/Tablet */}
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-red-500 mb-3 sm:mb-4 md:mb-6">
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-center">
                                SOBRE NOSSA EMPRESA
                            </span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>

                        {/* Main Title - Mobile/Tablet */}
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 md:mb-6 leading-tight text-center">
                            Dedicados a Fornecer
                            <span className="block">Peças Industriais</span>
                            <span className="block text-red-500">de Primeira Linha</span>
                        </h2>

                        {/* Description - Mobile/Tablet */}
                        <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-4 sm:mb-6 md:mb-8 leading-relaxed text-center px-2">
                            Garantimos rapidez, eficiência e suporte especializado para manter suas máquinas funcionando sem
                            interrupções, com peças certificadas e atendimento personalizado.
                        </p>

                        {/* Feature Cards - Mobile/Tablet */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`bg-red-500 rounded-lg p-3 sm:p-4 text-white transform transition-all duration-500 hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                        }`}
                                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                                >
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                                            <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-xs sm:text-sm md:text-base leading-tight">{feature.title}</h3>
                                            <p className="text-white/90 text-xs sm:text-sm leading-tight mt-0.5">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Benefits List - Mobile/Tablet */}
                        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-2 sm:gap-3 transform transition-all duration-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                                        }`}
                                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                                >
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button - Mobile/Tablet */}
                        <div
                            className={`text-center transform transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                }`}
                        >
                            <Button className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base">
                                SAIBA MAIS
                                <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                        </div>

                        {/* CEO Profile - Mobile/Tablet */}
                        <div
                            className={`mt-4 sm:mt-6 md:mt-8 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 transform transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                }`}
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-slate-200 rounded-full flex items-center justify-center">
                                <span className="text-slate-600 font-semibold text-xs sm:text-sm">JS</span>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-slate-500 text-xs sm:text-sm">CEO, Fundador</p>
                                <p className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base">João Silva</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout (≥ lg) */}
            <div className="hidden lg:flex min-h-screen">
                {/* Left Visual Section - Desktop */}
                <div className="w-1/2 relative bg-slate-100">
                    {/* Main Background Image */}
                    <div className="relative h-2/3 overflow-hidden">
                        <div
                            className={`absolute inset-0 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-105" : "opacity-0 scale-100"
                                }`}
                        >
                            <Image
                                src="/bg-industria.jpg"
                                alt="Industrial facility"
                                fill
                                className="object-cover object-center animate-slow-zoom"
                                priority
                                sizes="50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Play Button - Desktop */}
                        <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8">
                            <div
                                className={`transform transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                <Button
                                    className="w-14 h-14 lg:w-16 lg:h-16 bg-red-500 hover:bg-red-600 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                                    size="icon"
                                >
                                    <Play className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1" fill="white" />
                                </Button>
                                <p className="text-white font-semibold mt-2 text-center text-sm lg:text-base">ASSISTIR</p>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Image - Desktop */}
                    {/* <div className="relative h-1/3 overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            >
              <Image
                src="/bg-industria.jpg"
                alt="Industrial equipment"
                fill
                className="object-cover object-bottom animate-slow-pan"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
            </div>
          </div> */}

                    {/* Decorative Elements - Desktop */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-500 via-red-600 to-red-700"></div>
                    <div className="absolute top-1/2 right-0 w-3 lg:w-4 h-24 lg:h-32 bg-red-500 transform -translate-y-1/2"></div>
                </div>

                {/* Right Content Section - Desktop */}
                <div className="w-1/2 bg-white relative">
                    <div className="p-8 lg:p-12 xl:p-16 h-full flex flex-col justify-center">
                        <div
                            className={`transform transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                                }`}
                        >
                            {/* Header - Desktop */}
                            <div className="flex items-center gap-2 text-red-500 mb-4 lg:mb-6">
                                <ArrowRight className="w-4 h-4" />
                                <span className="uppercase text-sm font-semibold tracking-wider">SOBRE NOSSA EMPRESA</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>

                            {/* Main Title - Desktop */}
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 lg:mb-6 leading-tight">
                                Dedicados a Fornecer
                                <span className="block">Máquinas e Peças de</span>
                                <span className="block text-red-500">Primeira Linha</span>
                            </h2>

                            {/* Description - Desktop */}
                            <p className="text-base lg:text-lg text-slate-600 mb-6 lg:mb-8 leading-relaxed">
                                A Sangati Berga S.A. é especializada na fabricação de máquinas e equipamentos tecnologicamente avançados,
                                oferecendo soluções completas para moagem de trigo e milho, beneficiamento de arroz, produção de rações,
                                fábricas de misturas pulverulentas no setor alimentício, além de sistemas para transporte a granel de cereais e seus derivados.
                            </p>

                            {/* Feature Cards - Desktop */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`bg-red-500 rounded-lg p-3 lg:p-4 text-white transform transition-all duration-500 hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${400 + index * 100}ms` }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm lg:text-base">{feature.title}</h3>
                                                <p className="text-white/90 text-xs lg:text-sm">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Benefits List - Desktop */}
                            <div className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 transform transition-all duration-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                                            }`}
                                        style={{ transitionDelay: `${600 + index * 100}ms` }}
                                    >
                                        <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <span className="text-slate-700 text-sm lg:text-base">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button - Desktop */}
                            {/* <div
                                className={`transform transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                <Button className="bg-red-500 hover:bg-red-600 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base">
                                    SAIBA MAIS
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div> */}

                            {/* CEO Profile - Desktop */}
                            <div
                                className={`mt-6 lg:mt-8 flex items-center gap-3 lg:gap-4 transform transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-200 rounded-full flex items-center justify-center">
                                    <span className="text-slate-600 font-semibold text-sm">JS</span>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm">CEO, Fundador</p>
                                    <p className="font-semibold text-slate-900 text-sm lg:text-base">João Silva</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slow-zoom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        @keyframes slow-pan {
          0% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-5px) translateY(-3px);
          }
          50% {
            transform: translateX(0) translateY(-5px);
          }
          75% {
            transform: translateX(5px) translateY(-3px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        .animate-slow-zoom {
          animation: slow-zoom 15s ease-in-out infinite;
        }

        .animate-slow-pan {
          animation: slow-pan 20s ease-in-out infinite;
        }
      `}</style>
        </section>
    )
}
