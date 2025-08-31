"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type CaloriesResponse } from "@/types/apis"

export default function ResultCard({ result }: { result: CaloriesResponse }) {
  const { dish_name, servings, calories_per_serving, total_calories, source } = result

  return (
    <Card className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden transition-colors">
      <CardHeader className="bg-gradient-to-r from-green-400 via-teal-400 to-sky-500 p-6">
        <CardTitle className="text-white text-xl font-bold tracking-wide">
          🍽️ {dish_name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Total Calories</p>
          <p className="text-4xl font-extrabold text-foreground">{total_calories}</p>
          <p className="text-sm text-muted-foreground">kcal</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center p-4 rounded-lg bg-background border border-border">
            <span className="text-sm text-muted-foreground">Servings</span>
            <span className="text-lg font-semibold text-foreground">{servings}</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-background border border-border">
            <span className="text-sm text-muted-foreground">Per Serving</span>
            <span className="text-lg font-semibold text-foreground">{calories_per_serving}</span>
            <span className="text-xs text-muted-foreground">kcal</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
          Source: {source}
        </div>
      </CardContent>
    </Card>
  )
}
