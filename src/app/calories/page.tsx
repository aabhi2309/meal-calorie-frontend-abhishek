"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMealStore } from "@/stores/mealStore"
import ResultCard from "@/components/ResultCard"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

export default function CaloriesPage() {
  const { history } = useMealStore()
  const [showHistory, setShowHistory] = useState(false)
  const router = useRouter()

  const latest = history[history.length - 1] // most recent entry

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors"
      style={{ background: "var(--hero-gradient)", color: "var(--foreground)" }}
    >
      <Header />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Calorie Result</h1>
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
          >
            ← Back
          </Button>
        </div>

        {/* Latest Result */}
        {latest ? (
          <ResultCard result={latest} />
        ) : (
          <p className="text-muted-foreground">No result yet. Go back and enter a meal.</p>
        )}

        {/* History Toggle */}
        {history.length > 1 && (
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
              className="w-full"
            >
              {showHistory ? "Hide History" : "Show History"}
            </Button>
          </div>
        )}

        {/* History List */}
        {showHistory && history.length > 1 && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-lg font-semibold text-foreground">History</h2>
            {history
              .slice(0, -1) // exclude latest
              .reverse()    // show most recent first
              .map((r, i) => (
                <ResultCard key={i} result={r} />
              ))}
          </div>
        )}
      </main>
    </div>
  )
}
