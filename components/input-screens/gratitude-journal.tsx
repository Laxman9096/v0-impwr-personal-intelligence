"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Sparkles, Plus, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function GratitudeJournal() {
  const router = useRouter()
  const [entries, setEntries] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, ""])
    }
  }

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index))
    }
  }

  const updateEntry = (index: number, value: string) => {
    const newEntries = [...entries]
    newEntries[index] = value
    setEntries(newEntries)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validEntries = entries.filter((e) => e.trim() !== "")

    if (validEntries.length === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      gratitudeEntries: validEntries,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gratitude Journal</h1>
            <p className="text-slate-600">What are you grateful for today?</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gratitude Entries */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Today's Gratitude</h2>
              <Sparkles className="w-5 h-5 text-yellow-600" />
            </div>

            <div className="space-y-4">
              {entries.map((entry, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                      <span className="text-sm font-semibold text-yellow-700">{index + 1}</span>
                    </div>
                    <textarea
                      value={entry}
                      onChange={(e) => updateEntry(index, e.target.value)}
                      placeholder="I'm grateful for..."
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                      rows={2}
                    />
                    {entries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEntry(index)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors mt-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {entries.length < 5 && (
              <button
                type="button"
                onClick={addEntry}
                className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-yellow-500 hover:text-yellow-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Another Entry
              </button>
            )}
          </div>

          {/* Inspirational Quote */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
            <p className="text-lg font-medium text-balance mb-2">"Gratitude turns what we have into enough."</p>
            <p className="text-sm text-yellow-100">— Melody Beattie</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || entries.every((e) => e.trim() === "")}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Gratitude Journal"}
          </button>
        </form>
      </div>
    </div>
  )
}
