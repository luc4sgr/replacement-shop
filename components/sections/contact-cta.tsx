"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone, Mail, Send, MapPin, Clock, Users, ArrowRight } from "lucide-react"

export function ContactCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("contact-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <div className="group relative">
          <Button
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all"
            size="icon"
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Fale no WhatsApp
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>

        {/* Email Button */}
        <div className="group relative">
          <Button
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            size="icon"
            onClick={() => window.open("mailto:contato@industrialparts.com", "_blank")}
          >
            <Mail className="w-6 h-6 text-white" />
          </Button>
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Enviar E-mail
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact-section" className="py-0 bg-white relative overflow-hidden">
        <div className="flex min-h-screen relative">
          {/* Left Dark Section */}
          <div className="w-2/3 bg-slate-900 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-red-700 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-2/3 left-1/2 w-32 h-32 bg-red-500 rounded-full animate-pulse delay-2000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="px-8 lg:px-16 py-20 w-full">
                <div
                  className={`transform transition-all duration-1000 ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 text-red-500 mb-6">
                    <Phone className="w-4 h-4" />
                    <span className="uppercase text-sm font-semibold tracking-wider">Suporte Especializado</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Precisa de Ajuda
                    <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Especializada?</span>
                  </h2>

                  <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl">
                    Nossa equipe técnica está pronta para ajudar você a encontrar as peças certas para suas máquinas
                    industriais com atendimento personalizado.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">24h</div>
                          <div className="text-sm text-slate-400">Tempo de Resposta</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">20+</div>
                          <div className="text-sm text-slate-400">Anos de Experiência</div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">BR</div>
                          <div className="text-sm text-slate-400">Todo o Brasil</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Methods */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                        <p className="text-slate-300 text-sm">Atendimento imediato • (11) 99999-9999</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">Telefone</h3>
                        <p className="text-slate-300 text-sm">Suporte técnico • (11) 1234-5678</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">E-mail</h3>
                        <p className="text-slate-300 text-sm">Orçamentos • contato@industrialparts.com</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Blue Section with Form */}
          <div className="border-l-8 border-l-red-200 w-1/3 bg-gradient-to-br bg-slate-900 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-800 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-red-400 rounded-full animate-pulse delay-1000"></div>
            </div>

            {/* Form */}
            <div className="relative z-10 h-full flex items-center">
              <div className="p-8 w-full">
                <div
                  className={`transform transition-all duration-1000 delay-300 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Envie sua Mensagem</h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:bg-white/30"
                        />
                      </div>

                      <div>
                        <Input
                          type="email"
                          placeholder="Seu e-mail"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:bg-white/30"
                        />
                      </div>

                      <div>
                        <Textarea
                          placeholder="Descreva sua necessidade..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          rows={4}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:bg-white/30 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Send className="mr-2 w-4 h-4" />
                        Enviar Mensagem
                      </Button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-white/80 text-sm text-center">
                        Resposta garantida em até <strong>24 horas</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
