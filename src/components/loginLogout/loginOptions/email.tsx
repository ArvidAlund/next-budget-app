const LoginEmail = ({ email, setEmail, loading }: { email: string; setEmail: (email: string) => void; loading: boolean }) => {
    return (
            <div>
                <label htmlFor="email" className="block mb-1">E-post:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Din e-post"
                    className="p-2 border rounded w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer w-full mt-4"
                    disabled={loading}
                >
                    {loading ? "Länk skickas..." : "Skicka inloggningslänk"}
                </button>
            </div>
    );
}

export default LoginEmail;