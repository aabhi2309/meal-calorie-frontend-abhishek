import MealForm from "@/components/MealForm"
import Header from "@/components/Header"
import AuthGuard from "@/components/AuthGuard"

export default function Page() {
  return (
    <AuthGuard>
    <div
      className="min-h-screen w-full flex flex-col transition-colors"
      style={{ background: "var(--hero-gradient)", color: "var(--foreground)" }}
    >
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-8 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Dashboard</h2>
        <MealForm />
      </main>
    </div>
    </AuthGuard>
  )
}
