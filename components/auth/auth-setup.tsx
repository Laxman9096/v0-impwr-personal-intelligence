"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Fingerprint, Shield } from "lucide-react"

export function AuthSetup() {
  const router = useRouter()
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [useBiometrics, setUseBiometrics] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    if (pin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store auth settings (in production, this would be securely stored)
    localStorage.setItem("impwr_auth_setup", "true")
    localStorage.setItem("impwr_pin", pin) // In production, this would be hashed
    localStorage.setItem("impwr_biometrics", useBiometrics.toString())

    setIsSubmitting(false)
    router.push("/permissions")
  }

  const handlePinInput = (value: string, setter: (val: string) => void) => {
    const numericValue = value.replace(/\D/g, "").slice(0, 4)
    setter(numericValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Welcome to impwr
          </h1>
          <p className="text-slate-600">Let's secure your personal data</p>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-slate-900">Create Your PIN</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Enter 4-digit PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={pin}
                  onChange={(e) => handlePinInput(e.target.value, setPin)}
                  placeholder="••••"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  value={confirmPin}
                  onChange={(e) => handlePinInput(e.target.value, setConfirmPin)}
                  placeholder="••••"
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={4}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Biometrics Option */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <label className="flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={useBiometrics}
                onChange={(e) => setUseBiometrics(e.target.checked)}
                className="mt-1 w-5 h-5 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Fingerprint className="w-5 h-5 text-orange-600" />
                  <p className="font-semibold text-slate-900">Enable Biometric Authentication</p>
                </div>
                <p className="text-sm text-slate-600">
                  Use fingerprint or face recognition for faster access (when available)
                </p>
              </div>
            </label>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-2">Your Privacy Matters</h3>
            <p className="text-sm text-white/90">
              All your data is stored locally on your device by default. You have complete control over what data IMPWR
              can access.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || pin.length !== 4 || confirmPin.length !== 4}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Setting up..." : "Continue to Permissions"}
          </button>
        </form>
      </div>
    </div>
  )
}
