"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Activity, Dumbbell, Bike, Footprints, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const activityTypes = [
  { label: "Running", icon: Footprints, value: "running", color: "text-red-600" },
  { label: "Cycling", icon: Bike, value: "cycling", color: "text-red-600" },
  { label: "Strength", icon: Dumbbell, value: "strength", color: "text-red-600" },
  { label: "Cardio", icon: Heart, value: "cardio", color: "text-red-600" },
  { label: "Other", icon: Activity, value: "other", color: "text-red-600" },
]

export function ActivityLog() {
  const router = useRouter()
  const [activityType, setActivityType] = useState("")
  const [duration, setDuration] = useState(30)
  const [intensity, setIntensity] = useState(5)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activityType) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      activityType,
      duration,
      intensity,
      notes,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Activity Log</h1>
            <p className="text-slate-600">Track your physical activities</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Activity Type */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Activity Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activityTypes.map((activity) => {
                const Icon = activity.icon
                const isSelected = activityType === activity.value
                return (
                  <button
                    key={activity.value}
                    type="button"
                    onClick={() => setActivityType(activity.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-red-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${isSelected ? "text-red-900" : "text-slate-600"}`}>
                      {activity.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Duration */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Duration (minutes)</h2>
            <div className="space-y-4">
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">5 min</span>
                <span className="text-3xl font-bold text-red-600">{duration} min</span>
                <span className="text-sm text-slate-600">180 min</span>
              </div>
            </div>
          </div>

          {/* Intensity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Intensity</h2>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>Light</span>
                <span className="text-2xl font-bold text-red-600">{intensity}</span>
                <span>Intense</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Any achievements?"
              className="w-full h-24 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!activityType || isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Activity"}
          </button>
        </form>
      </div>
    </div>
  )
}
