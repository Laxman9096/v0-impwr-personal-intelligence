"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Cloud,
  Check,
  X,
  Camera,
  Calendar,
  Activity,
  DollarSign,
  Music,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

interface DataSource {
  id: string
  name: string
  category: "mobile" | "desktop" | "cloud"
  icon: any
  description: string
  permissions: string[]
  enabled: boolean
}

const dataSources: DataSource[] = [
  {
    id: "health-data",
    name: "Health Data",
    category: "mobile",
    icon: Activity,
    description: "Access to HealthKit/Google Fit data",
    permissions: ["Steps", "Heart Rate", "Sleep", "Workouts"],
    enabled: false,
  },
  {
    id: "photos",
    name: "Photos",
    category: "mobile",
    icon: Camera,
    description: "Access to photo library for memories",
    permissions: ["Read Photos", "Photo Metadata"],
    enabled: false,
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "desktop",
    icon: Calendar,
    description: "Access to calendar events and schedules",
    permissions: ["Read Events", "Event Metadata"],
    enabled: false,
  },
  {
    id: "financial",
    name: "Financial Accounts",
    category: "cloud",
    icon: DollarSign,
    description: "Read-only access via Plaid",
    permissions: ["Transaction History", "Account Balances"],
    enabled: false,
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "cloud",
    icon: Music,
    description: "Your listening history and preferences",
    permissions: ["Recently Played", "Top Artists"],
    enabled: false,
  },
  {
    id: "goodreads",
    name: "Goodreads",
    category: "cloud",
    icon: BookOpen,
    description: "Your reading list and reviews",
    permissions: ["Reading List", "Book Reviews"],
    enabled: false,
  },
]

export function PermissionsManager() {
  const router = useRouter()
  const [sources, setSources] = useState(dataSources)
  const [selectedCategory, setSelectedCategory] = useState<"all" | "mobile" | "desktop" | "cloud">("all")

  const toggleSource = (id: string) => {
    setSources(sources.map((source) => (source.id === id ? { ...source, enabled: !source.enabled } : source)))
  }

  const handleContinue = () => {
    // Save permissions
    const enabledSources = sources.filter((s) => s.enabled)
    localStorage.setItem("impwr_permissions", JSON.stringify(enabledSources))
    router.push("/")
  }

  const filteredSources = selectedCategory === "all" ? sources : sources.filter((s) => s.category === selectedCategory)

  const categoryIcons = {
    mobile: Smartphone,
    desktop: Monitor,
    cloud: Cloud,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/auth/setup" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Data Permissions</h1>
            <p className="text-slate-600">Choose which data sources IMPWR can access</p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-6 text-white mb-8">
          <h3 className="font-semibold mb-2">You're in Control</h3>
          <p className="text-sm text-white/90">
            Every data source requires your explicit permission. You can revoke access at any time from Settings. All
            data is stored locally and encrypted.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-orange-500 text-white"
                : "bg-white text-slate-700 border border-slate-200 hover:border-orange-500"
            }`}
          >
            All Sources
          </button>
          {(["mobile", "desktop", "cloud"] as const).map((category) => {
            const Icon = categoryIcons[category]
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-orange-500"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            )
          })}
        </div>

        {/* Data Sources */}
        <div className="space-y-4 mb-8">
          {filteredSources.map((source) => {
            const Icon = source.icon
            const CategoryIcon = categoryIcons[source.category]
            return (
              <div
                key={source.id}
                className={`bg-white rounded-2xl p-6 border-2 transition-all ${
                  source.enabled ? "border-orange-500 bg-orange-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      source.enabled ? "bg-orange-100" : "bg-slate-100"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${source.enabled ? "text-orange-600" : "text-slate-600"}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{source.name}</h3>
                      <CategoryIcon className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{source.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {source.permissions.map((permission) => (
                        <span key={permission} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSource(source.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      source.enabled ? "bg-orange-500 hover:bg-orange-600" : "bg-slate-200 hover:bg-slate-300"
                    }`}
                  >
                    {source.enabled ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <X className="w-6 h-6 text-slate-600" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Data Sources Enabled</p>
              <p className="text-2xl font-bold text-slate-900">
                {sources.filter((s) => s.enabled).length} / {sources.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">You can change these anytime</p>
              <p className="text-sm font-medium text-orange-600">Settings → Permissions</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Continue to IMPWR
        </button>

        <p className="text-center text-sm text-slate-500 mt-4">
          You can skip this step and configure permissions later
        </p>
      </div>
    </div>
  )
}
