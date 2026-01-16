
type LoginPasswordProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loading: boolean;
};

const LoginPassword = ({email, setEmail, password, setPassword, loading} : LoginPasswordProps) => {
    return (
        <>
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
            </div>

            <div>
                <label htmlFor="password" className="block mb-1">Lösenord:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ditt lösenord"
                        className="p-2 border rounded w-full"
                        required
                        value={password}
                    />
            </div>

            <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Loggar in..." : "Logga in"}
                </button>
        </>
    );
}
export default LoginPassword;