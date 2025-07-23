// components/LoginModal.tsx
"use client"

import { useState } from "react"
import supabase from "@/app/lib/supabaseClient"

export function LoginModal() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) {
      setMessage("Fel: " + error.message)
    } else {
      setMessage("Kolla din e-post för en inloggningslänk!")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-black text-center">Logga in</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Din e-post"
            className="p-2 border rounded text-black"
            required
          />
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Skickar..." : "Skicka inloggningslänk"}
          </button>
          {message && <p className="text-sm text-gray-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  )
}
