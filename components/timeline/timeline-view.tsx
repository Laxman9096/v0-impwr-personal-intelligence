"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TimelineChart } from "./timeline-chart"

export function TimelineView() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Timeline
          </h1>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Growth Journey</h2>
          <p className="text-slate-600">Track your holistic progress over time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <TimelineChart />
        </div>

        {/* Milestones */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Recent Milestones</h3>

          <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">🎉</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">12-Day Learning Streak!</p>
              <p className="text-sm text-slate-600">You've consistently engaged in learning activities</p>
              <p className="text-xs text-slate-500 mt-1">2 days ago</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">💰</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Positive Cash Flow Month</p>
              <p className="text-sm text-slate-600">You saved $450 this month</p>
              <p className="text-xs text-slate-500 mt-1">5 days ago</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">🙏</span>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Gratitude Practice Established</p>
              <p className="text-sm text-slate-600">28 gratitude entries this month</p>
              <p className="text-xs text-slate-500 mt-1">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
