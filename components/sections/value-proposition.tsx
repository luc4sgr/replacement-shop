"use client"

import { useEffect, useState } from "react"
import { Clock, Shield, Wrench, Zap } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Resposta Rápida",
    description: "Orçamentos em até 24 horas com nossa equipe especializada",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Peças certificadas com garantia de qualidade e procedência",
    color: "text-green-500",
  },
  {
    icon: Wrench,
    title: "Suporte Técnico",
    description: "Assistência técnica especializada para instalação e manutenção",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    title: "Entrega Expressa",
    description: "Logística otimizada para entregas rápidas em todo o Brasil",
    color: "text-red-500",
  },
]

export function ValueProposition() {
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
    <section id="value-proposition" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Conte sempre com a gente!</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Garantimos rapidez, eficiência e suporte especializado para manter suas máquinas funcionando sem interrupções.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>

              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
