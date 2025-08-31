"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { postJson } from "@/lib/api"
import { useMealStore } from "@/stores/mealStore"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { type CaloriesResponse } from "@/types/apis"
import { useRouter } from "next/navigation"

const schema = z.object({
  dish_name: z.string().min(1, "Dish name is required"),
  servings: z.number().int().positive().max(50, "Too many servings"),
})

type FormValues = z.infer<typeof schema>

export default function MealForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dish_name: "", servings: 1 },
  })

  const setResult = useMealStore((s) => s.setResult)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      const res = await postJson<CaloriesResponse>("/api/getCalories", values)
      setResult(res)
      reset({ dish_name: values.dish_name, servings: values.servings })
      /* eslint-disable @typescript-eslint/no-explicit-any */
      router.push("/calories") 
    } catch (e: any) {
      setError(e.message || "Lookup failed")
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-card p-6 shadow-md border border-border">
        <h2 className="text-xl font-semibold mb-4 text-foreground">🍽️ Meal Calculator</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor="dish_name" className="text-foreground mb-1 block">
              Dish name
            </Label>
            <Input
              id="dish_name"
              placeholder="e.g. chicken biryani"
              {...register("dish_name")}
              className="bg-background border-border text-foreground placeholder-muted-foreground"
            />
            <p className="text-sm text-destructive">{formState.errors.dish_name?.message}</p>
          </div>

          <div>
            <Label htmlFor="servings" className="text-foreground mb-1 block">
              Servings
            </Label>
            <Input
              id="servings"
              type="number"
              min={1}
              {...register("servings", { valueAsNumber: true })}
              className="bg-background border-border text-foreground placeholder-muted-foreground"
            />
            <p className="text-sm text-destructive">{formState.errors.servings?.message}</p>
          </div>

          <div className="sm:col-span-3 flex justify-end">
            {error && <p className="text-sm text-destructive mr-auto">{error}</p>}
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:opacity-90 px-6"
              disabled={formState.isSubmitting}
              aria-busy={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Calculating…" : "Get calories"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
