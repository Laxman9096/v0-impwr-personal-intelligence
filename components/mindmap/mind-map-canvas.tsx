"use client"

import { useEffect, useRef } from "react"

interface Node {
  id: string
  label: string
  type: "hub" | "pillar" | "insight" | "resource" | "action"
  pillar?: string
  x?: number
  y?: number
  color: string
}

interface Link {
  source: string
  target: string
  color: string
}

interface MindMapCanvasProps {
  onNodeSelect: (node: Node | null) => void
}

export function MindMapCanvas({ onNodeSelect }: MindMapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample data structure
  const nodes: Node[] = [
    { id: "hub", label: "My IMPWR Hub", type: "hub", color: "#64748b" },
    { id: "energy", label: "Energy", type: "pillar", pillar: "energy", color: "#f97316" },
    { id: "financial", label: "Financial Health", type: "pillar", pillar: "financial", color: "#22c55e" },
    { id: "emotions", label: "Emotions", type: "pillar", pillar: "emotions", color: "#3b82f6" },
    { id: "physical", label: "Physical Health", type: "pillar", pillar: "physical", color: "#ef4444" },
    { id: "mental", label: "Mental Health", type: "pillar", pillar: "mental", color: "#a855f7" },
    { id: "spiritual", label: "Spiritual Health", type: "pillar", pillar: "spiritual", color: "#eab308" },

    // Sample insights
    { id: "insight-1", label: "Energy dips after 3 days without exercise", type: "insight", color: "#f97316" },
    { id: "insight-2", label: "Save 15% more with gratitude practice", type: "insight", color: "#22c55e" },
    { id: "resource-1", label: "Caffeine Calculator", type: "resource", color: "#f97316" },
    { id: "action-1", label: "Schedule a break", type: "action", color: "#f97316" },
  ]

  const links: Link[] = [
    { source: "hub", target: "energy", color: "#f97316" },
    { source: "hub", target: "financial", color: "#22c55e" },
    { source: "hub", target: "emotions", color: "#3b82f6" },
    { source: "hub", target: "physical", color: "#ef4444" },
    { source: "hub", target: "mental", color: "#a855f7" },
    { source: "hub", target: "spiritual", color: "#eab308" },

    // Cross-pillar connections
    { source: "energy", target: "physical", color: "#f97316" },
    { source: "energy", target: "insight-1", color: "#f97316" },
    { source: "financial", target: "spiritual", color: "#22c55e" },
    { source: "financial", target: "insight-2", color: "#22c55e" },
    { source: "energy", target: "resource-1", color: "#f97316" },
    { source: "energy", target: "action-1", color: "#f97316" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      draw()
    }

    // Simple force-directed layout simulation
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) / 3

    // Position nodes
    nodes.forEach((node, i) => {
      if (node.type === "hub") {
        node.x = centerX
        node.y = centerY
      } else if (node.type === "pillar") {
        const angle = ((i - 1) * (Math.PI * 2)) / 6
        node.x = centerX + Math.cos(angle) * radius
        node.y = centerY + Math.sin(angle) * radius
      } else {
        // Position insights/resources near their parent pillar
        const parentPillar = nodes.find((n) => n.id === links.find((l) => l.target === node.id)?.source)
        if (parentPillar && parentPillar.x && parentPillar.y) {
          const offset = Math.random() * 100 + 80
          const angle = Math.random() * Math.PI * 2
          node.x = parentPillar.x + Math.cos(angle) * offset
          node.y = parentPillar.y + Math.sin(angle) * offset
        }
      }
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw links
      links.forEach((link) => {
        const source = nodes.find((n) => n.id === link.source)
        const target = nodes.find((n) => n.id === link.target)
        if (source?.x && source?.y && target?.x && target?.y) {
          ctx.beginPath()
          ctx.moveTo(source.x, source.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = link.color + "40"
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        if (!node.x || !node.y) return

        const nodeRadius = node.type === "hub" ? 40 : node.type === "pillar" ? 30 : 20

        // Draw node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3
        ctx.stroke()

        // Draw label
        ctx.fillStyle = "#1e293b"
        ctx.font =
          node.type === "hub"
            ? "bold 16px sans-serif"
            : node.type === "pillar"
              ? "bold 14px sans-serif"
              : "12px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.label, node.x, node.y + nodeRadius + 20)
      })
    }

    resize()
    window.addEventListener("resize", resize)

    // Handle clicks
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const clickedNode = nodes.find((node) => {
        if (!node.x || !node.y) return false
        const nodeRadius = node.type === "hub" ? 40 : node.type === "pillar" ? 30 : 20
        const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
        return distance <= nodeRadius
      })

      onNodeSelect(clickedNode || null)
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("click", handleClick)
    }
  }, [onNodeSelect])

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-50">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-semibold text-sm text-slate-900 mb-2">Legend</h3>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500" />
            <span>Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Pillar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Insight/Resource/Action</span>
          </div>
        </div>
      </div>
    </div>
  )
}
