"use client"
import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { postJson } from "@/lib/api"
import { useAuthStore } from "@/stores/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const baseSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const registerOnly = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters"),
})

const combinedSchema = baseSchema.merge(registerOnly.partial())
type FormValues = z.infer<typeof combinedSchema>
type Mode = "login" | "register"

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()

  const { setUser, setAuthed, isAuthed } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const isRegister = mode === "register";

  useEffect(() => {
    if (isAuthed) {
      router.replace("/dashboard")
    }
  }, [isAuthed, router])
   
  

  const resolverSchema = isRegister ? baseSchema.merge(registerOnly) : baseSchema
  const form = useForm<FormValues>({
    resolver: zodResolver(resolverSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setError(null)
    try {
      const url = isRegister ? "/api/register" : "/api/login"

      /* eslint-disable @typescript-eslint/no-explicit-any */

      const res = await postJson<{ user?: any }>(url, values)
      if (res?.user) setUser(res.user)
        
      setAuthed(true)
      router.replace("/dashboard")
      /* eslint-disable @typescript-eslint/no-explicit-any */

    } catch (e: any) {
      setError(e?.message || "Something went wrong")
    }
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors"
      style={{ background: "var(--hero-gradient)", color: "var(--foreground)" }}
    >
      <div className="flex flex-1">
        {/* Left panel (branding) - only visible on large screens */}
        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 px-12 text-foreground">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-green-400 via-teal-400 to-sky-500 flex items-center justify-center">
              <span className="text-white text-xl">🍏</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-300 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              NutriTrack
            </h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">Smarter Nutrition Tracking</h2>
          <p className="text-lg text-muted-foreground max-w-md text-center">
            Track your meals, understand your intake, and make healthier choices with confidence.
          </p>
        </div>
  
        {/* Right panel (form) */}
        <div className="flex flex-1 items-start sm:items-center justify-center p-4 py-15 sm:p-6">
          {/* 👆 items-start on mobile = small top gap
               👆 items-center on sm+ = centered vertically */}
  
          <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-xl backdrop-blur-md border border-border">
            <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h2>
  
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {isRegister && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground mb-1 block">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      className="bg-background border-border text-foreground placeholder-muted-foreground"
                      placeholder="Jane"
                    />
                    <p className="text-sm text-destructive">{form.formState.errors.firstName?.message}</p>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground mb-1 block">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      className="bg-background border-border text-foreground placeholder-muted-foreground"
                      placeholder="Doe"
                    />
                    <p className="text-sm text-destructive">{form.formState.errors.lastName?.message}</p>
                  </div>
                </div>
              )}
  
              <div>
                <Label htmlFor="email" className="text-foreground mb-1 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="bg-background border-border text-foreground placeholder-muted-foreground"
                  placeholder="Enter your email"
                />
                <p className="text-sm text-destructive">{form.formState.errors.email?.message}</p>
              </div>
  
              <div>
                <Label htmlFor="password" className="text-foreground mb-1 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                  className="bg-background border-border text-foreground placeholder-muted-foreground"
                  placeholder="Enter your password"
                />
                <p className="text-sm text-destructive">{form.formState.errors.password?.message}</p>
              </div>
  
              {error && <p className="text-sm text-destructive">{error}</p>}
  
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-90 transition font-semibold py-2 rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Please wait…"
                  : isRegister
                  ? "Create Account"
                  : "Sign In"}
              </Button>
            </form>
  
            {/* Footer Links */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isRegister ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-primary hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/register")}
                    className="text-primary hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}
