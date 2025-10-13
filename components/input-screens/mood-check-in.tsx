"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Heart, Smile, Meh, Frown, CloudRain } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const emotions = [
  { label: "Joyful", icon: Smile, color: "bg-blue-500", value: "joyful" },
  { label: "Content", icon: Heart, color: "bg-blue-400", value: "content" },
  { label: "Neutral", icon: Meh, color: "bg-blue-300", value: "neutral" },
  { label: "Anxious", icon: Frown, color: "bg-blue-600", value: "anxious" },
  { label: "Sad", icon: CloudRain, color: "bg-blue-700", value: "sad" },
]

export function MoodCheckIn() {
  const router = useRouter()
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [intensity, setIntensity] = useState(5)
  const [journalText, setJournalText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, this would save to the database
    console.log({
      emotions: selectedEmotions,
      intensity,
      journalText,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mood Check-in</h1>
            <p className="text-slate-600">How are you feeling right now?</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Emotion Selection */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Select your emotions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map((emotion) => {
                const Icon = emotion.icon
                const isSelected = selectedEmotions.includes(emotion.value)
                return (
                  <button
                    key={emotion.value}
                    type="button"
                    onClick={() => toggleEmotion(emotion.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-slate-600"}`}>
                      {emotion.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Intensity</h2>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>Mild</span>
                <span className="text-2xl font-bold text-blue-600">{intensity}</span>
                <span>Intense</span>
              </div>
            </div>
          </div>

          {/* Journal Entry */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Journal (Optional)</h2>
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="What's on your mind? Writing about your feelings can help process them..."
              className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={selectedEmotions.length === 0 || isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Check-in"}
          </button>
        </form>
      </div>
    </div>
  )
}
