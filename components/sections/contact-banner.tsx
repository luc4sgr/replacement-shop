"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SupportWoman from "../assets/support-woman.png"
export function ContactBanner() {
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

    const element = document.getElementById("contact-banner")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact-banner" className="relative bg-white py-12 lg:py-20 overflow-hidden">
      {/* Background Waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute bottom-0 left-0 w-full h-32 text-slate-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            className="animate-wave"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-24 text-slate-100 opacity-70"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C400,20 800,100 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
            className="animate-wave-reverse"
          />
        </svg>

        <svg
          className="absolute top-0 right-0 w-full h-20 text-red-50 opacity-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200,40 C900,80 600,0 300,40 C150,60 50,20 0,40 L0,0 L1200,0 Z"
            fill="currentColor"
            className="animate-wave-slow"
          />
        </svg>
      </div>

      {/* Animated Triangles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Triangle 1 */}
        <div className="absolute top-20 left-10 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-red-500 opacity-60 animate-float-1"></div>

        {/* Triangle 2 */}
        <div className="absolute top-40 right-20 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-red-400 opacity-70 animate-float-2"></div>

        {/* Triangle 3 */}
        <div className="absolute bottom-32 left-1/4 w-0 h-0 border-l-[25px] border-r-[25px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-600 opacity-50 animate-float-3"></div>

        {/* Triangle 4 */}
        <div className="absolute top-1/2 right-1/3 w-0 h-0 border-l-[18px] border-r-[18px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-500 opacity-40 animate-float-4"></div>

        {/* Triangle 5 */}
        <div className="absolute bottom-20 right-10 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-400 opacity-80 animate-float-5"></div>

        {/* Triangle 6 */}
        <div className="absolute top-1/3 left-1/3 w-0 h-0 border-l-[22px] border-r-[22px] border-b-[38px] border-l-transparent border-r-transparent border-b-red-600 opacity-30 animate-float-6"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <div className="text-center space-y-8">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  Precisa de Ajuda
                  <br />
                  <span className="text-red-600">Especializada?</span>
                </h2>
                <p className="text-xl text-slate-600 mb-8">Nossa equipe técnica está pronta para ajudar você</p>
              </div>

              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <Image
                  src={SupportWoman}
                  alt="Professional support specialist"
                  width={400}
                  height={480}
                  className="mx-auto max-w-sm object-cover"
                  priority
                />
              </div>

              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6  text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    FALE CONOSCO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 Columns */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
            {/* Left - Text (4 columns) */}
            <div className="lg:col-span-4 relative z-10">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <h2 className="text-5xl xl:text-6xl font-bold text-slate-900 leading-tight relative z-10">
                  Precisa de Ajuda
                  <br />
                  <span className="text-red-600">Especializada?</span>
                </h2>
                <p className="text-xl xl:text-2xl text-slate-600 mt-6 leading-relaxed relative z-10">
                  Nossa equipe técnica está pronta para ajudar você
                </p>
              </div>
            </div>

            {/* Center - Image (4 columns) */}
            <div className="lg:col-span-4 flex justify-center relative z-0">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="relative">
                  <Image
                    src={SupportWoman}
                    alt="Professional support specialist"
                    width={450}
                    height={540}
                    className="object-cover max-w-md xl:max-w-lg"
                    priority
                  />

                  {/* Subtle glow effect behind image */}
                  <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl opacity-20 scale-110 -z-10"></div>
                </div>
              </div>
            </div>

            {/* Right - Button (4 columns) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div
                className={`transition-all duration-1000 delay-600 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    FALE CONOSCO
                    <ArrowRight className="w-5 h-5 xl:w-6 xl:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25px);
          }
        }

        @keyframes wave-reverse {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25px);
          }
        }

        @keyframes wave-slow {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-15px);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(180deg);
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-180deg);
          }
        }

        @keyframes float-5 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(180deg);
          }
        }

        @keyframes float-6 {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-22px) rotate(-180deg);
          }
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }

        .animate-wave-reverse {
          animation: wave-reverse 10s ease-in-out infinite;
        }

        .animate-wave-slow {
          animation: wave-slow 12s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 8s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 5s ease-in-out infinite;
        }

        .animate-float-5 {
          animation: float-5 9s ease-in-out infinite;
        }

        .animate-float-6 {
          animation: float-6 6.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
