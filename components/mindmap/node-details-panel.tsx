"use client"

import { X, TrendingUp, ExternalLink } from "lucide-react"

interface NodeDetailsPanelProps {
  node: any
  onClose: () => void
}

export function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  return (
    <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Node Details</h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded transition-colors">
          <X className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Node Header */}
        <div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: node.color + "20" }}
          >
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: node.color }} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">{node.label}</h3>
          <p className="text-sm text-slate-600 capitalize">{node.type}</p>
        </div>

        {/* Node Content */}
        {node.type === "insight" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Insight Details</h4>
              <p className="text-sm text-slate-600">
                This insight was discovered by analyzing patterns across your Energy and Physical Health data over the
                past 30 days.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-slate-900">Confidence Score</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">87%</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Connected Pillars</h4>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">Energy</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Physical</span>
              </div>
            </div>
          </div>
        )}

        {node.type === "resource" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Resource Description</h4>
              <p className="text-sm text-slate-600">
                Calculate your optimal caffeine intake based on your sleep patterns and energy levels.
              </p>
            </div>
            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              Open Tool
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}

        {node.type === "action" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Recommended Action</h4>
              <p className="text-sm text-slate-600">
                Your energy levels suggest it's time for a short break. A 10-minute walk or stretch can help restore
                focus.
              </p>
            </div>
            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
              Complete Action
            </button>
          </div>
        )}

        {node.type === "pillar" && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-2">Pillar Overview</h4>
              <p className="text-sm text-slate-600">
                Track and improve your {node.label.toLowerCase()} through data-driven insights and personalized
                recommendations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-1">Insights</p>
                <p className="text-xl font-bold text-slate-900">3</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-600 mb-1">Resources</p>
                <p className="text-xl font-bold text-slate-900">5</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
