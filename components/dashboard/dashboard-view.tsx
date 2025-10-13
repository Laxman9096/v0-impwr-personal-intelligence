"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardTile } from "./dashboard-tile"

export function DashboardView() {
  const tiles = [
    {
      pillar: "Energy",
      metric: "Avg. Daily Energy Score",
      value: "7.2",
      unit: "/10",
      trend: "up",
      trendValue: "5%",
      color: "orange",
      bgGradient: "from-orange-500 to-orange-600",
    },
    {
      pillar: "Financial Health",
      metric: "Net Cash Flow",
      value: "+$450",
      unit: "this month",
      trend: "up",
      trendValue: "12%",
      color: "green",
      bgGradient: "from-green-500 to-green-600",
    },
    {
      pillar: "Emotions",
      metric: "Avg. Mood",
      value: "7.2",
      unit: "/10",
      trend: "up",
      trendValue: "3%",
      color: "blue",
      bgGradient: "from-blue-500 to-blue-600",
    },
    {
      pillar: "Physical Health",
      metric: "Weekly Activity Goal",
      value: "85%",
      unit: "complete",
      trend: "down",
      trendValue: "5%",
      color: "red",
      bgGradient: "from-red-500 to-red-600",
    },
    {
      pillar: "Mental Health",
      metric: "Learning Streak",
      value: "12",
      unit: "days",
      trend: "up",
      trendValue: "100%",
      color: "purple",
      bgGradient: "from-purple-500 to-purple-600",
    },
    {
      pillar: "Spiritual Health",
      metric: "Gratitude Entries",
      value: "28",
      unit: "this month",
      trend: "up",
      trendValue: "40%",
      color: "yellow",
      bgGradient: "from-yellow-500 to-yellow-600",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Holistic Overview</h2>
          <p className="text-slate-600">Track your progress across all six pillars of well-being</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile) => (
            <DashboardTile key={tile.pillar} {...tile} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/emotions/check-in" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <p className="font-semibold text-blue-900">Mood Check-in</p>
              <p className="text-sm text-blue-700">Log how you're feeling</p>
            </Link>
            <Link href="/energy/log" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
              <p className="font-semibold text-orange-900">Energy Log</p>
              <p className="text-sm text-orange-700">Track your vitality</p>
            </Link>
            <Link
              href="/spiritual/gratitude"
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <p className="font-semibold text-yellow-900">Gratitude Journal</p>
              <p className="text-sm text-yellow-700">Practice thankfulness</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
