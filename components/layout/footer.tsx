import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LogoWithe from "../assets/logo/SB_B.svg"
import Image from "next/image"
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Image src={LogoWithe} height={70} alt="Sangati Berga Logo" />
            {/* <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IP</span>
              </div>
              <span className="font-bold text-lg sm:text-xl">IndustrialParts</span>
            </div> */}
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Especialistas em reposição de peças industriais com mais de 20 anos de experiência no mercado.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/machines" className="text-slate-300 hover:text-white transition-colors text-sm">
                Catálogo de Máquinas
              </Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors text-sm">
                Sobre Nós
              </Link>
              <Link href="/terms" className="text-slate-300 hover:text-white transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base sm:text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  Rua Industrial, 123
                  <br />
                  São Paulo, SP - 01234-567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-slate-300 text-sm">(11) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-slate-300 text-sm break-all">contato@industrialparts.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-base sm:text-lg">Newsletter</h3>
            <p className="text-slate-300 text-sm">Receba novidades sobre peças e equipamentos industriais.</p>
            <div className="space-y-3">
              <Input
                placeholder="Seu e-mail"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 text-sm"
              />
              <Button className="w-full bg-red-600 hover:bg-red-700 text-sm py-2">Inscrever-se</Button>
            </div>
            <p className="text-xs text-slate-400">Ao se inscrever, você concorda com nossa política de privacidade.</p>
          </div> */}
        </div>

        <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-slate-400 text-xs sm:text-sm">© 2025 Sangati Berga. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
