import { useState } from "react"
import supabase from "@/app/lib/supabaseClient"


const LoginForm = () => {
    const [email, setEmail] = useState("")       // Användarens e-post
  const [message, setMessage] = useState("")   // Feedback till användaren
  const [loading, setLoading] = useState(false) // Om OTP skickas
  const [success, setSuccess] = useState(false); // Om inloggningslänken skickades framgångsrikt

  /**
   * Hantera formulärsubmit
   * @param e React.FormEvent
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Skicka OTP-länk via Supabase
    const { error } = await supabase.auth.signInWithOtp({ email })

    setLoading(false)

    if (error) {
      // Visa felmeddelande
      setMessage("Fel: " + error.message)
    } else {
      // Visa framgångsmeddelande
        setMessage("Kolla din e-post för en inloggningslänk!")
        setSuccess(true);
    }
  }

  return (
      <div className="max-w-sm w-full">
        {!success && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <h2>Logga in</h2>
                {/* E-postfält */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din e-post"
                    className="p-2 border rounded"
                    required
                />

                {/* Skicka-knapp */}
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Skickar..." : "Skicka inloggningslänk"}
                </button>
            </form>
        )}
        {message && <p className="text-sm text-center animate-fade-in-down">{message}</p>}
      </div>
  )
}
export default LoginForm;