"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Database, Bell, Palette, Info, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SettingsView() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("impwr_authenticated")
    router.push("/auth/login")
  }

  const settingsSections = [
    {
      title: "Security",
      icon: Shield,
      items: [
        { label: "Change PIN", href: "/settings/change-pin" },
        { label: "Biometric Settings", href: "/settings/biometrics" },
        { label: "Data Encryption", href: "/settings/encryption" },
      ],
    },
    {
      title: "Data & Privacy",
      icon: Database,
      items: [
        { label: "Manage Permissions", href: "/permissions" },
        { label: "Data Sources", href: "/settings/data-sources" },
        { label: "Export Data", href: "/settings/export" },
        { label: "Delete All Data", href: "/settings/delete-data" },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { label: "Insight Alerts", href: "/settings/notifications" },
        { label: "Daily Reminders", href: "/settings/reminders" },
      ],
    },
    {
      title: "Appearance",
      icon: Palette,
      items: [
        { label: "Theme", href: "/settings/theme" },
        { label: "Display Options", href: "/settings/display" },
      ],
    },
    {
      title: "About",
      icon: Info,
      items: [
        { label: "Version", href: "/settings/version" },
        { label: "Open Source License", href: "/settings/license" },
        { label: "Privacy Policy", href: "/settings/privacy" },
      ],
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
            Settings
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="space-y-6">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-orange-600" />
                  <h2 className="font-semibold text-slate-900">{section.title}</h2>
                </div>
                <div className="divide-y divide-slate-200">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <p className="text-slate-700">{item.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>

          {/* Version Info */}
          <div className="text-center text-sm text-slate-500">
            <p>IMPWR v0.1.0 (Alpha)</p>
            <p>Licensed under AGPL-3.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
