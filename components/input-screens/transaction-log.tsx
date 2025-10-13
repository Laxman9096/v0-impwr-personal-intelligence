"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, ShoppingBag, Home, Car, Utensils } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  { label: "Shopping", icon: ShoppingBag, value: "shopping" },
  { label: "Housing", icon: Home, value: "housing" },
  { label: "Transport", icon: Car, value: "transport" },
  { label: "Food", icon: Utensils, value: "food" },
  { label: "Other", icon: DollarSign, value: "other" },
]

export function TransactionLog() {
  const router = useRouter()
  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [merchant, setMerchant] = useState("")
  const [isRecurring, setIsRecurring] = useState(false)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({
      type: transactionType,
      amount: Number.parseFloat(amount),
      category,
      merchant,
      isRecurring,
      notes,
      timestamp: new Date().toISOString(),
    })

    setIsSubmitting(false)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Transaction Log</h1>
            <p className="text-slate-600">Track your financial activity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Transaction Type */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Transaction Type</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransactionType("expense")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  transactionType === "expense" ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <TrendingDown
                  className={`w-5 h-5 ${transactionType === "expense" ? "text-red-600" : "text-slate-400"}`}
                />
                <span className={`font-semibold ${transactionType === "expense" ? "text-red-900" : "text-slate-600"}`}>
                  Expense
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("income")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  transactionType === "income"
                    ? "border-green-500 bg-green-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <TrendingUp
                  className={`w-5 h-5 ${transactionType === "income" ? "text-green-600" : "text-slate-400"}`}
                />
                <span className={`font-semibold ${transactionType === "income" ? "text-green-900" : "text-slate-600"}`}>
                  Income
                </span>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Amount</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-4 text-2xl font-bold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isSelected = category === cat.value
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? "text-green-600" : "text-slate-400"}`} />
                    <p className={`text-sm font-medium ${isSelected ? "text-green-900" : "text-slate-600"}`}>
                      {cat.label}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Merchant */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Merchant (Optional)</h2>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="e.g., Amazon, Starbucks, Salary..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Recurring */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-5 h-5 text-green-600 border-slate-300 rounded focus:ring-green-500"
              />
              <div>
                <p className="font-semibold text-slate-900">Recurring Transaction</p>
                <p className="text-sm text-slate-600">This transaction repeats regularly</p>
              </div>
            </label>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notes (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional details..."
              className="w-full h-24 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!amount || !category || isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Transaction"}
          </button>
        </form>
      </div>
    </div>
  )
}
