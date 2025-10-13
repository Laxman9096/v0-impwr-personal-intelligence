import { TrendingUp, TrendingDown } from "lucide-react"

interface DashboardTileProps {
  pillar: string
  metric: string
  value: string
  unit: string
  trend: "up" | "down"
  trendValue: string
  color: string
  bgGradient: string
}

export function DashboardTile({
  pillar,
  metric,
  value,
  unit,
  trend,
  trendValue,
  color,
  bgGradient,
}: DashboardTileProps) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600"
  const trendBg = trend === "up" ? "bg-green-50" : "bg-red-50"

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${bgGradient} rounded-xl p-4 mb-4`}>
        <h3 className="text-white font-bold text-lg">{pillar}</h3>
      </div>

      {/* Metric */}
      <div className="mb-4">
        <p className="text-sm text-slate-600 mb-1">{metric}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-600">{unit}</p>
        </div>
      </div>

      {/* Trend */}
      <div className={`inline-flex items-center gap-1 px-3 py-1 ${trendBg} rounded-full`}>
        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        <span className={`text-sm font-semibold ${trendColor}`}>{trendValue}</span>
      </div>
    </div>
  )
}
