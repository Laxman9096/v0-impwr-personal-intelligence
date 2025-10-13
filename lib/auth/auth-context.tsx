"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  isSetup: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSetup, setIsSetup] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if auth is setup
    const authSetup = localStorage.getItem("impwr_auth_setup") === "true"
    const authenticated = localStorage.getItem("impwr_authenticated") === "true"

    setIsSetup(authSetup)
    setIsAuthenticated(authenticated)
    setIsLoading(false)

    // Redirect logic
    const publicPaths = ["/auth/setup", "/auth/login"]
    const isPublicPath = publicPaths.includes(pathname)

    if (!authSetup && !isPublicPath) {
      router.push("/auth/setup")
    } else if (authSetup && !authenticated && !isPublicPath) {
      router.push("/auth/login")
    }
  }, [pathname, router])

  const login = () => {
    localStorage.setItem("impwr_authenticated", "true")
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("impwr_authenticated")
    setIsAuthenticated(false)
    router.push("/auth/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full animate-pulse mx-auto mb-4" />
          <p className="text-slate-600">Loading IMPWR...</p>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ isAuthenticated, isSetup, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
