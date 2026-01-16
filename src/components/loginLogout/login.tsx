import { useState } from "react"
import supabase from "@/app/lib/supabaseClient"
import LoginPassword from "./loginOptions/password";

type LoginProps = {
    selectedOption: string | null;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
};

function renderLogin({selectedOption, email, setEmail, password, setPassword}: LoginProps) {
  switch (selectedOption) {
    case 'password':
      return <LoginPassword email={email} setEmail={setEmail} password={password} setPassword={setPassword} />;
    default:
      return null;
  }
}



const LoginForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>('password'); // Standardinloggningsmetod
  const [email, setEmail] = useState("")       // Användarens e-post
  const [password, setPassword] = useState("") // Användarens lösenord
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

    if (selectedOption === 'password') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setMessage(`Fel vid inloggning: ${error.message}`)
        setLoading(false)
        return
      }
      setMessage("Inloggning lyckades!")
      setSuccess(true);
      setLoading(false)
    }
  }

  return (
      <div className="max-w-sm w-full">
        {!success && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <h2>Logga in</h2>
                {renderLogin({selectedOption: selectedOption, email, setEmail, password, setPassword})}
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Loggar in..." : "Logga in"}
                </button>
            </form>
        )}
        {message && <p className="text-sm text-center animate-fade-in-down">{message}</p>}
      </div>
  )
}
export default LoginForm;