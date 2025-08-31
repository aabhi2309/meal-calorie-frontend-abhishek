"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useMealStore } from "@/stores/mealStore" // ✅ import meal store

type User = { first_name?: string; last_name?: string; email: string } | null
type State = { user: User; isAuthed: boolean }
type Actions = { setUser: (u: User) => void; setAuthed: (v: boolean) => void; logout: () => void }

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      isAuthed: false,
      setUser: (u) => set({ user: u }),
      setAuthed: (v) => set({ isAuthed: v }),
      logout: () => {
        // reset auth
        set({ user: null, isAuthed: false })
        // reset meals
        useMealStore.getState().clear()
      },
    }),
    { name: "auth" }
  )
)
