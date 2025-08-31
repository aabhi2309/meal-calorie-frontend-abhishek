"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type CaloriesResponse } from "@/types/apis"

type State = { lastResult?: CaloriesResponse; history: CaloriesResponse[] }
type Actions = {
  setResult: (r: CaloriesResponse) => void
  clear: () => void
}

export const useMealStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      lastResult: undefined,
      history: [],
      setResult: (r) => set({ lastResult: r, history: [r, ...get().history].slice(0, 20) }),
      clear: () => set({ lastResult: undefined, history: [] }),
    }),
    { name: "meals" }
  )
)
