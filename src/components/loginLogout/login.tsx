import { useState } from "react"
import supabase from "@/app/lib/supabaseClient"
import LoginPassword from "./loginOptions/password";
import LoginEmail from "./loginOptions/email";

type LoginProps = {
    selectedOption: string | null;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
};

function renderLogin({selectedOption, email, setEmail, password, setPassword, loading }: LoginProps) {
  switch (selectedOption) {
    case 'email':
      return <LoginEmail email={email} setEmail={setEmail} loading={loading} />;
    default:
      return <LoginPassword email={email} setEmail={setEmail} password={password} setPassword={setPassword} loading={loading} />;
  }
}



const LoginForm = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Standardinloggningsmetod
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

    if (selectedOption === null) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setMessage(`Fel vid inloggning: ${error.message}`)
        setLoading(false)
        return
      }
      setSuccess(true);
      setLoading(false);
      window.location.href = "/";
    }

    if (selectedOption === 'email') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      })
      if (error) {
        setMessage(`Fel vid inloggning: ${error.message}`)
        setLoading(false)
        return
      }
      setMessage("Inloggningslänk skickad till din e-post!")
      setSuccess(true);
      setLoading(false);
    }
  }

  return (
      <div className="max-w-sm w-full">
        {!success && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <h2>Logga in</h2>
                {renderLogin({selectedOption: selectedOption, email, setEmail, password, setPassword, loading})}
            </form>
        )}
        {message && <p className="text-sm text-center animate-fade-in-down">{message}</p>}
        <div className="border-t mt-6 pt-4"> 
          <h5 className="text-center mb-3 text-sm text-gray-400 uppercase tracking-wide">Välj inloggningsmetod</h5> 
          <div className="grid grid-cols-2 gap-3"> 
            <button onClick={() => setSelectedOption(null)} 
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200 font-medium ${selectedOption === null ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} 
              > 
              🔒 Lösenord 
            </button> 
            <button onClick={() => setSelectedOption('email')} 
            className={`flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200 font-medium ${selectedOption === 'email' ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`} 
            >
              📧 Mail 
            </button> 
          </div> 
        </div>
      </div>
  )
}
export default LoginForm;