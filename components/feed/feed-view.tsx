"use client"

import { useState } from "react"
import { Heart, MessageCircle, Bookmark, Share2, TrendingUp, Sparkles, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeedItem {
  id: string
  type: "insight" | "recommendation" | "milestone" | "article" | "video"
  pillar: "energy" | "financial" | "emotions" | "physical" | "mental" | "spiritual"
  title: string
  description: string
  imageUrl?: string
  author?: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  isSaved: boolean
}

const pillarColors = {
  energy: "from-orange-400/80 to-orange-500/80",
  financial: "from-green-400/80 to-green-500/80",
  emotions: "from-blue-400/80 to-blue-500/80",
  physical: "from-red-400/80 to-red-500/80",
  mental: "from-purple-400/80 to-purple-500/80",
  spiritual: "from-yellow-400/80 to-yellow-500/80",
}

const pillarNames = {
  energy: "Energy",
  financial: "Financial",
  emotions: "Emotions",
  physical: "Physical",
  mental: "Mental",
  spiritual: "Spiritual",
}

// Mock feed data based on user's metadata
const mockFeedData: FeedItem[] = [
  {
    id: "1",
    type: "insight",
    pillar: "energy",
    title: "Your Energy Patterns This Week",
    description: "You've been most energized between 9-11 AM. Consider scheduling important tasks during this window.",
    imageUrl: "/energy-patterns-graph-visualization.jpg",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    isLiked: false,
    isSaved: true,
  },
  {
    id: "2",
    type: "recommendation",
    pillar: "mental",
    title: "Recommended: Deep Work Techniques",
    description: "Based on your learning patterns, this article on flow states could help you achieve 40% more focus.",
    author: "Dr. Sarah Chen",
    imageUrl: "/person-in-deep-focus-working.jpg",
    timestamp: "5 hours ago",
    likes: 156,
    comments: 23,
    isLiked: true,
    isSaved: false,
  },
  {
    id: "3",
    type: "milestone",
    pillar: "physical",
    title: "7-Day Streak Achieved!",
    description: "You've logged physical activity for 7 consecutive days. Your consistency is building momentum.",
    imageUrl: "/celebration-achievement-trophy.jpg",
    timestamp: "1 day ago",
    likes: 89,
    comments: 12,
    isLiked: true,
    isSaved: true,
  },
  {
    id: "4",
    type: "video",
    pillar: "emotions",
    title: "5-Minute Emotional Check-In Practice",
    description: "A guided practice to help you identify and process emotions. Perfect for your morning routine.",
    author: "Mindful Living",
    imageUrl: "/peaceful-meditation.png",
    timestamp: "2 days ago",
    likes: 342,
    comments: 45,
    isLiked: false,
    isSaved: false,
  },
  {
    id: "5",
    type: "article",
    pillar: "financial",
    title: "Your Spending Insights",
    description: "You've reduced discretionary spending by 15% this month. Here's how to maintain this momentum.",
    imageUrl: "/financial-growth-chart.png",
    timestamp: "3 days ago",
    likes: 67,
    comments: 8,
    isLiked: false,
    isSaved: true,
  },
  {
    id: "6",
    type: "recommendation",
    pillar: "spiritual",
    title: "Gratitude Practice for Better Sleep",
    description: "Your sleep quality improved 30% on days you journaled. Try this evening gratitude routine.",
    author: "Wellness Collective",
    imageUrl: "/peaceful-evening-journal-writing.jpg",
    timestamp: "4 days ago",
    likes: 203,
    comments: 31,
    isLiked: true,
    isSaved: false,
  },
]

export function FeedView() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>(mockFeedData)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const toggleLike = (id: string) => {
    setFeedItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item,
      ),
    )
  }

  const toggleSave = (id: string) => {
    setFeedItems((items) => items.map((item) => (item.id === id ? { ...item, isSaved: !item.isSaved } : item)))
  }

  const filters = ["all", "energy", "financial", "emotions", "physical", "mental", "spiritual"]

  const filteredItems = activeFilter === "all" ? feedItems : feedItems.filter((item) => item.pillar === activeFilter)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full opacity-20 blur-lg" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-3 border-white rounded-full" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                impwr
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/mindmap">
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <TrendingUp className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Pills */}
      <div className="sticky top-[73px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? filter === "all"
                      ? "bg-gradient-to-r from-orange-400/20 to-yellow-400/20 text-orange-300 border border-orange-400/30"
                      : `bg-gradient-to-r ${pillarColors[filter as keyof typeof pillarColors]} text-white`
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {filter === "all" ? "For You" : pillarNames[filter as keyof typeof pillarNames]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed */}
      <main className="max-w-2xl mx-auto pb-20">
        {filteredItems.map((item) => (
          <article key={item.id} className="border-b border-white/10">
            {/* Post Header */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${pillarColors[item.pillar]} flex items-center justify-center`}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.author || "IMPWR Insights"}</p>
                    <p className="text-white/50 text-xs">{item.timestamp}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${pillarColors[item.pillar]} text-white`}
                >
                  {pillarNames[item.pillar]}
                </span>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <h2 className="text-white font-bold text-lg mb-2 text-balance">{item.title}</h2>
                <p className="text-white/70 text-sm text-pretty leading-relaxed">{item.description}</p>
              </div>
            </div>

            {/* Post Image */}
            {item.imageUrl && (
              <div className="relative w-full aspect-[3/2] bg-white/5">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-6">
                  <button onClick={() => toggleLike(item.id)} className="flex items-center gap-2 group">
                    <Heart
                      className={`w-6 h-6 transition-all ${
                        item.isLiked ? "fill-red-500 text-red-500" : "text-white/60 group-hover:text-red-500"
                      }`}
                    />
                    <span className="text-white/60 text-sm">{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 group">
                    <MessageCircle className="w-6 h-6 text-white/60 group-hover:text-blue-400 transition-colors" />
                    <span className="text-white/60 text-sm">{item.comments}</span>
                  </button>
                  <button className="group">
                    <Share2 className="w-6 h-6 text-white/60 group-hover:text-green-400 transition-colors" />
                  </button>
                </div>
                <button onClick={() => toggleSave(item.id)} className="group">
                  <Bookmark
                    className={`w-6 h-6 transition-all ${
                      item.isSaved ? "fill-yellow-500 text-yellow-500" : "text-white/60 group-hover:text-yellow-500"
                    }`}
                  />
                </button>
              </div>
            </div>
          </article>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col items-center gap-1 text-orange-400 hover:text-orange-300 hover:bg-white/5"
              >
                <Sparkles className="w-6 h-6" />
                <span className="text-xs">Feed</span>
              </Button>
            </Link>
            <Link href="/mindmap">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col items-center gap-1 text-white/60 hover:text-white hover:bg-white/5"
              >
                <TrendingUp className="w-6 h-6" />
                <span className="text-xs">Map</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col items-center gap-1 text-white/60 hover:text-white hover:bg-white/5"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <span className="text-xs">Dashboard</span>
              </Button>
            </Link>
            <Link href="/timeline">
              <Button
                variant="ghost"
                size="lg"
                className="flex flex-col items-center gap-1 text-white/60 hover:text-white hover:bg-white/5"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs">Timeline</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
