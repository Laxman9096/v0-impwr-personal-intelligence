"use client"

import { useEffect, useRef } from "react"

export function TimelineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Sample data for 30 days
    const days = 30
    const data = {
      energy: Array.from({ length: days }, (_, i) => 5 + Math.sin(i / 5) * 2 + Math.random()),
      financial: Array.from({ length: days }, (_, i) => 6 + Math.cos(i / 4) * 1.5 + Math.random() * 0.5),
      emotions: Array.from({ length: days }, (_, i) => 6.5 + Math.sin(i / 6) * 1.5 + Math.random() * 0.5),
      physical: Array.from({ length: days }, (_, i) => 7 + Math.cos(i / 7) * 1 + Math.random() * 0.5),
      mental: Array.from({ length: days }, (_, i) => 5.5 + Math.sin(i / 8) * 2 + Math.random() * 0.5),
      spiritual: Array.from({ length: days }, (_, i) => 6 + Math.cos(i / 5) * 1.5 + Math.random() * 0.5),
    }

    const colors = {
      energy: "#f97316",
      financial: "#22c55e",
      emotions: "#3b82f6",
      physical: "#ef4444",
      mental: "#a855f7",
      spiritual: "#eab308",
    }

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const y = (height - 60) * (i / 10) + 20
      ctx.beginPath()
      ctx.moveTo(40, y)
      ctx.lineTo(width - 20, y)
      ctx.stroke()
    }

    // Draw lines for each pillar
    Object.entries(data).forEach(([pillar, values]) => {
      ctx.strokeStyle = colors[pillar as keyof typeof colors]
      ctx.lineWidth = 2
      ctx.beginPath()

      values.forEach((value, i) => {
        const x = 40 + (width - 60) * (i / (days - 1))
        const y = height - 40 - (value / 10) * (height - 60)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    })

    // Draw legend
    const legendItems = Object.keys(data)
    const legendX = 40
    const legendY = height - 30

    legendItems.forEach((pillar, i) => {
      const x = legendX + i * 120

      ctx.fillStyle = colors[pillar as keyof typeof colors]
      ctx.fillRect(x, legendY, 12, 12)

      ctx.fillStyle = "#1e293b"
      ctx.font = "12px sans-serif"
      ctx.fillText(pillar.charAt(0).toUpperCase() + pillar.slice(1), x + 18, legendY + 10)
    })
  }, [])

  return (
    <div className="w-full">
      <canvas ref={canvasRef} width={1000} height={400} className="w-full h-auto" />
    </div>
  )
}
