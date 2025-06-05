"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, Globe, Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import Logo from "../assets/logo/SB_V.svg"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { getItemCount, toggleCart } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex p-3 items-center space-x-2 group flex-shrink-0">
            {/* <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">IP</span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-slate-900 hidden sm:block">IndustrialParts</span>
            <span className="font-bold text-lg text-slate-900 sm:hidden">IP</span> */}
            <Image src={Logo} height={70} alt="Sangati Berga Logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/" className="text-slate-700 hover:text-red-600 transition-colors font-medium">
              Início
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-slate-700 hover:text-red-600 transition-colors font-medium">
                Catálogo
                <ChevronDown className="ml-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/machines/mills" className="w-full">
                    Moinhos Industriais
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/machines/cutting" className="w-full">
                    Equipamentos de Corte
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/machines/filtration" className="w-full">
                    Sistemas de Filtração
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/machines/cylinders" className="w-full">
                    Cilindros Industriais
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/contact" className="text-slate-700 hover:text-red-600 transition-colors font-medium">
              Contato
            </Link>
          </nav>

          {/* Search Bar - Hidden on small screens */}
          <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md xl:max-w-lg mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar máquinas..."
                className="pl-10 pr-4 bg-slate-50 border-slate-200 focus:border-red-500 text-sm"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector - Hidden on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Globe className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>🇧🇷 Português</DropdownMenuItem>
                <DropdownMenuItem>🇺🇸 English</DropdownMenuItem>
                <DropdownMenuItem>🇪🇸 Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle - Hidden on mobile */}
            <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className="hidden sm:flex">
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" onClick={toggleCart}>
              <ShoppingCart className="w-4 h-4" />
              {getItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs animate-pulse">
                  {getItemCount()}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">

                    <Image src={Logo} width={200} alt="Sangati Berga Logo" />
                    {/* <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">IP</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900">IndustrialParts</span>
                    </div> */}
                  </div>

                  {/* Mobile Search */}
                  <div className="py-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input placeholder="Buscar máquinas ou peças..." className="pl-10 bg-slate-50 border-slate-200" />
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4 py-6 flex-1">
                    <Link
                      href="/"
                      className="text-slate-700 hover:text-red-600 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Início
                    </Link>

                    <div className="space-y-2">
                      <div className="text-slate-700 font-medium py-2">Catálogo</div>
                      <div className="pl-4 space-y-2">
                        <Link
                          href="/machines/mills"
                          className="block text-slate-600 hover:text-red-600 transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Moinhos Industriais
                        </Link>
                        <Link
                          href="/machines/cutting"
                          className="block text-slate-600 hover:text-red-600 transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Equipamentos de Corte
                        </Link>
                        <Link
                          href="/machines/filtration"
                          className="block text-slate-600 hover:text-red-600 transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sistemas de Filtração
                        </Link>
                        <Link
                          href="/machines/cylinders"
                          className="block text-slate-600 hover:text-red-600 transition-colors py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Cilindros Industriais
                        </Link>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="text-slate-700 hover:text-red-600 transition-colors font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contato
                    </Link>
                  </nav>

                  {/* Mobile Settings */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Idioma</span>
                      <Button variant="outline" size="sm">
                        🇧🇷 PT
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Tema</span>
                      <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <CartSidebar />
    </header>
  )
}
