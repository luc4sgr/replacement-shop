import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sangati Berga - Peças Industriais de Última Geração",
  description:
    "Encontre as peças certas para suas máquinas industriais com nossa tecnologia avançada e atendimento especializado.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  )
}
