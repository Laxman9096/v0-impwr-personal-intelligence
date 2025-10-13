import Link from "next/link"
import { Battery, DollarSign, Heart, Activity, Brain, Sparkles, Settings } from "lucide-react"

export default function HomePage() {
  const pillars = [
    {
      name: "Energy",
      icon: Battery,
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Vitality, rest, recovery",
      href: "/energy",
    },
    {
      name: "Financial Health",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      description: "Stability, freedom, growth",
      href: "/financial",
    },
    {
      name: "Emotions",
      icon: Heart,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Awareness, regulation, expression",
      href: "/emotions",
    },
    {
      name: "Physical Health",
      icon: Activity,
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      description: "Fitness, nutrition, body",
      href: "/physical",
    },
    {
      name: "Mental Health",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Clarity, learning, flow",
      href: "/mental",
    },
    {
      name: "Spiritual Health",
      icon: Sparkles,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Purpose, connection, peace",
      href: "/spiritual",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header with Settings */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <Link href="/settings" className="p-2 hover:bg-white rounded-lg transition-colors">
            <Settings className="w-6 h-6 text-slate-600" />
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full opacity-20 blur-xl" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-white rounded-full" />
                <div className="absolute w-1 h-6 bg-white top-4 left-1/2 -translate-x-1/2" />
              </div>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              impwr
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-balance">
            Your operating system for a better you. Connect the dots across your entire life.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <Link
            href="/mindmap"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Mind Map
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold hover:shadow-lg transition-shadow border border-slate-200"
          >
            Dashboard
          </Link>
          <Link
            href="/timeline"
            className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold hover:shadow-lg transition-shadow border border-slate-200"
          >
            Timeline
          </Link>
        </div>

        {/* Six Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <Link
                key={pillar.name}
                href={pillar.href}
                className="group relative overflow-hidden bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                />
                <div className="relative">
                  <div className={`${pillar.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 ${pillar.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.name}</h3>
                  <p className="text-slate-600 text-sm">{pillar.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Open Source Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200">
            <span className="text-sm text-slate-600">Open Source</span>
            <span className="text-sm font-semibold text-slate-900">AGPL-3.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
