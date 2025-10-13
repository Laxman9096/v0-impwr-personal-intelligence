"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Battery, Coffee, Moon, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const energyLevels = [
  { level: 1, label: "Exhausted", icon: Battery, color: "text-red-600" },
  { level: 3, label: "Low", icon: Battery, color: "text-orange-600" },
  { level: 5, label: "Moderate", icon: Battery, color: "text-yellow-600" },
  { level: 7, label: "Good", icon: Zap, color: "text-green-600" },
  { level: 10, label: "Energized", icon: Zap, color: "text-emerald-600" },
]

const factors = [
  { label: "Good Sleep", icon: Moon, value: "sleep" },
  { label: "Caffeine", icon: Coffee, value: "caffeine" },
  { label: "Exercise", icon: Zap, value: "exercise" },
  { label: "Stress", icon: Battery, value: "stress" },
]

export function EnergyLog() {
  const router = useRouter()
  const [energyLevel, setEnergyLevel] = useState(5)
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) => (prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      energyLevel,
      factors: selectedFactors,
      notes,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Energy Log</h1>
            <p className="text-slate-600">Track your vitality levels</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Energy Level Selection */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Current Energy Level</h2>
            <div className="space-y-4">
              {energyLevels.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.level}
                    type="button"
                    onClick={() => setEnergyLevel(item.level)}
                    className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                      energyLevel === item.level
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${energyLevel === item.level ? "text-orange-600" : "text-slate-400"}`} />
                    <div className="flex-1 text-left">
                      <p
                        className={`font-semibold ${energyLevel === item.level ? "text-orange-900" : "text-slate-700"}`}
                      >
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-500">Level {item.level}/10</p>
                    </div>
                    {energyLevel === item.level && <div className="w-4 h-4 bg-orange-500 rounded-full" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contributing Factors */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contributing Factors</h2>
            <div className="grid grid-cols-2 gap-3">
              {factors.map((factor) => {
                const Icon = factor.icon
                const isSelected = selectedFactors.includes(factor.value)
                return (
                  <button
                    key={factor.value}
                    type="button"
                    onClick={() => toggleFactor(factor.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? "text-orange-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${isSelected ? "text-orange-900" : "text-slate-600"}`}>
                      {factor.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional context about your energy levels..."
              className="w-full h-24 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Energy Log"}
          </button>
        </form>
      </div>
    </div>
  )
}
