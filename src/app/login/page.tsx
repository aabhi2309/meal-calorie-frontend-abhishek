import AuthForm from "@/components/AuthForm"
import Header from "@/components/Header"

export default function Page() {
  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors"
      style={{ background: "var(--hero-gradient)", color: "var(--foreground)" }}
    >
      <Header showLogout={false} />

      <main className="flex flex-1 items-center justify-center px-6 sm:px-16 md:px-24 lg:px-40">
        <AuthForm mode="login" />
      </main>
    </div>
  )
}
