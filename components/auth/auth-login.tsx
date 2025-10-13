"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Fingerprint } from "lucide-react"

export function AuthLogin() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const storedPin = typeof window !== "undefined" ? localStorage.getItem("impwr_pin") : null
  const biometricsEnabled = typeof window !== "undefined" ? localStorage.getItem("impwr_biometrics") === "true" : false

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (pin !== storedPin) {
      setError("Incorrect PIN")
      setPin("")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    localStorage.setItem("impwr_authenticated", "true")
    setIsSubmitting(false)
    router.push("/")
  }

  const handleBiometricAuth = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate biometric authentication
    localStorage.setItem("impwr_authenticated", "true")
    setIsSubmitting(false)
    router.push("/")
  }

  const handlePinInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 4)
    setPin(numericValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mb-4">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            impwr
          </h1>
          <p className="text-slate-600">Enter your PIN to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <label className="block text-sm font-medium text-slate-700 mb-3 text-center">Enter PIN</label>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(e) => handlePinInput(e.target.value)}
              placeholder="••••"
              autoFocus
              className="w-full px-4 py-4 text-center text-3xl tracking-widest border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength={4}
            />

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 text-center">{error}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || pin.length !== 4}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Unlocking..." : "Unlock"}
          </button>

          {biometricsEnabled && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-50 text-slate-500">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleBiometricAuth}
                disabled={isSubmitting}
                className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Fingerprint className="w-5 h-5" />
                Use Biometrics
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
