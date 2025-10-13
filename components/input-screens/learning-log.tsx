"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Brain, Book, Video, Headphones, Code } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const learningTypes = [
  { label: "Reading", icon: Book, value: "reading" },
  { label: "Video Course", icon: Video, value: "video" },
  { label: "Podcast", icon: Headphones, value: "podcast" },
  { label: "Practice", icon: Code, value: "practice" },
  { label: "Other", icon: Brain, value: "other" },
]

export function LearningLog() {
  const router = useRouter()
  const [learningType, setLearningType] = useState("")
  const [topic, setTopic] = useState("")
  const [duration, setDuration] = useState(30)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!learningType || !topic) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      learningType,
      topic,
      duration,
      notes,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Learning Log</h1>
            <p className="text-slate-600">Track your mental growth</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Learning Type */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Learning Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {learningTypes.map((type) => {
                const Icon = type.icon
                const isSelected = learningType === type.value
                return (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setLearningType(type.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-purple-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${isSelected ? "text-purple-900" : "text-slate-600"}`}>
                      {type.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Topic */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">What did you learn?</h2>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., React Hooks, Spanish Grammar, Machine Learning..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Duration */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Duration (minutes)</h2>
            <div className="space-y-4">
              <input
                type="range"
                min="5"
                max="240"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">5 min</span>
                <span className="text-3xl font-bold text-purple-600">{duration} min</span>
                <span className="text-sm text-slate-600">240 min</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Key Takeaways (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What were the main insights? What will you apply?"
              className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!learningType || !topic || isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Learning Session"}
          </button>
        </form>
      </div>
    </div>
  )
}
