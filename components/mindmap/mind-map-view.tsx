"use client"

import { useState } from "react"
import { ArrowLeft, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { MindMapCanvas } from "./mind-map-canvas"
import { NodeDetailsPanel } from "./node-details-panel"

export function MindMapView() {
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="relative h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Mind Map
          </h1>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-5 h-5 text-slate-600" />
          ) : (
            <Maximize2 className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mind Map Canvas */}
        <div className="flex-1 relative">
          <MindMapCanvas onNodeSelect={setSelectedNode} />
        </div>

        {/* Details Panel */}
        {selectedNode && !isFullscreen && (
          <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
      </div>
    </div>
  )
}
