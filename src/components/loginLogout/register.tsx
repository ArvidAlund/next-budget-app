import { useState } from "react"
import supabase from "@/app/lib/supabaseClient"

const fields = [
    { label: "Namn", type: "text", stateSetter: "setName" },
    { label: "E-post", type: "email", stateSetter: "setEmail" },
    { label: "Lösenord", type: "password", stateSetter: "setPassword" },
    { label: "Bekräfta lösenord", type: "password", stateSetter: "setRewritePassword" },
];

const RegisterForm = () => {
    const [email, setEmail] = useState("")       // Användarens e-post
    const [password, setPassword] = useState<string>("") // Användarens lösenord
    const [rewritePassword, setRewritePassword] = useState<string>("") // Bekräfta lösenord
    const [name, setName] = useState<string>("") // Användarens namn
    const [loading, setLoading] = useState(false) // Om OTP skickas
    const [success, setSuccess] = useState(false); // Om inloggningslänken skickades framgångsrikt
    const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Hantera formulärsubmit
   * @param e React.FormEvent
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage("");

    if (password !== rewritePassword) {
        setErrorMessage("Lösenorden matchar inte.");
        setLoading(false);
        return;
    }
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    })
    if (error) {
        setErrorMessage(`Fel vid registrering: ${error.message}`)
        setLoading(false)
        return
    }
    setSuccess(true);
    setLoading(false);
    window.location.reload();
  }

  return (
      <div className="max-w-sm w-full">
        {!success && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <h2>Registrera konto</h2>
                {/* E-postfält */}
                {fields.map((field) => (
                    <div key={field.label} className="flex flex-col">
                        <label className="mb-1" htmlFor={field.label}>{field.label}</label>
                        <input
                            type={field.type}
                            id={field.label}
                            className="border border-gray-300 p-2 rounded"
                            value={
                                field.stateSetter === "setEmail" ? email :
                                field.stateSetter === "setPassword" ? password :
                                field.stateSetter === "setRewritePassword" ? rewritePassword :
                                field.stateSetter === "setName" ? name : ""
                            }
                            onChange={(e) => {
                                if (field.stateSetter === "setEmail") setEmail(e.target.value);
                                else if (field.stateSetter === "setPassword") setPassword(e.target.value);
                                else if (field.stateSetter === "setName") setName(e.target.value);
                                else setRewritePassword(e.target.value);
                            }}
                            required
                        />
                    </div>
                ))}
                <hr />

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Skapar konto..." : "Skapa konto"}
                </button>
            </form>
        )}
        {errorMessage && <p className="text-sm text-center text-red-500 animate-fade-in-down">{errorMessage}</p>}
      </div>
  )
}
export default RegisterForm;