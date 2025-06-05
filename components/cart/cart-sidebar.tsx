"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { Trash2, ShoppingCart, ArrowRight, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

const urgencyOptions = {
  low: { label: "Baixa", color: "bg-green-100 text-green-800", icon: "🟢" },
  medium: { label: "Média", color: "bg-yellow-100 text-yellow-800", icon: "🟡" },
  high: { label: "Alta", color: "bg-orange-100 text-orange-800", icon: "🟠" },
  critical: { label: "Crítica", color: "bg-red-100 text-red-800", icon: "🔴" },
}

export function CartSidebar() {
  const { state, removeItem, closeCart } = useCart()

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrinho de Solicitações
            {state.items.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {state.items.length}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {state.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Carrinho vazio</h3>
            <p className="text-slate-600 mb-6">Adicione solicitações de peças para continuar</p>
            <Button asChild onClick={closeCart}>
              <Link href="/machines">Explorar Máquinas</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {/* Machine Info */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                        <Image
                          src={item.machineImage || "/placeholder.svg"}
                          alt={item.machineName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">{item.machineName}</h4>
                        <p className="text-xs text-slate-600">
                          {item.machineBrand} • {item.machineModel}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Categories */}
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Categorias:</p>
                      <div className="flex flex-wrap gap-1">
                        {item.partCategories.slice(0, 3).map((category, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {item.partCategories.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.partCategories.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Problem Description */}
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-1">Problema:</p>
                      <p className="text-xs text-slate-600 line-clamp-2">{item.problemDescription}</p>
                    </div>

                    {/* Added Time */}
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      Adicionado {formatDistanceToNow(item.addedAt, { addSuffix: true, locale: ptBR })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            {/* Summary */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Resumo da Solicitação</span>
                </div>
                <div className="space-y-1 text-xs text-blue-800">
                  <div>• {state.items.length} solicitações de peças</div>
                  <div>• {new Set(state.items.map((item) => item.machineId)).size} máquinas diferentes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700" onClick={closeCart}>
                  <Link href="/checkout">
                    Finalizar Solicitação
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" onClick={closeCart} asChild>
                  <Link href="/machines">Continuar Solicitação</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
