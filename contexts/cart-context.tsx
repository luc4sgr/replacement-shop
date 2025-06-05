"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: string
  machineId: number
  machineName: string
  machineBrand: string
  machineModel: string
  machineImage: string
  partCategories: string[]
  problemDescription: string
  urgency: "low" | "medium" | "high" | "critical"
  serialNumber?: string
  manufacturingYear?: string
  operatingHours?: string
  attachments: File[]
  addedAt: Date
}

export interface ContactData {
  fullName: string
  company: string
  email: string
  phone: string
  whatsapp: string
  city: string
  state: string
  zipCode: string
  maxBudget: string
  desiredDeadline: string
  preferCertified: boolean
}

interface CartState {
  items: CartItem[]
  contactData: ContactData | null
  isOpen: boolean
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_ITEM"; payload: { id: string; updates: Partial<CartItem> } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CONTACT_DATA"; payload: ContactData }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartState }

const initialState: CartState = {
  items: [],
  contactData: null,
  isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item,
        ),
      }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        contactData: null,
      }
    case "SET_CONTACT_DATA":
      return {
        ...state,
        contactData: action.payload,
      }
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case "OPEN_CART":
      return {
        ...state,
        isOpen: true,
      }
    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      }
    case "LOAD_CART":
      return action.payload
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, "id" | "addedAt">) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  setContactData: (data: ContactData) => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getItemCount: () => number
  getTotalMachines: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("industrial-parts-cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Convert date strings back to Date objects
        const cartWithDates = {
          ...parsedCart,
          items: parsedCart.items.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt),
          })),
        }
        dispatch({ type: "LOAD_CART", payload: cartWithDates })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("industrial-parts-cart", JSON.stringify(state))
  }, [state])

  const addItem = (item: Omit<CartItem, "id" | "addedAt">) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.machineId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date(),
    }
    dispatch({ type: "ADD_ITEM", payload: newItem })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: "UPDATE_ITEM", payload: { id, updates } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const setContactData = (data: ContactData) => {
    dispatch({ type: "SET_CONTACT_DATA", payload: data })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  const getItemCount = () => {
    return state.items.length
  }

  const getTotalMachines = () => {
    const uniqueMachines = new Set(state.items.map((item) => item.machineId))
    return uniqueMachines.size
  }

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    setContactData,
    toggleCart,
    openCart,
    closeCart,
    getItemCount,
    getTotalMachines,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
