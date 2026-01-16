
type LoginPasswordProps = {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
};

const LoginPassword = ({email, setEmail, password, setPassword} : LoginPasswordProps) => {
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
        </>
    );
}
export default LoginPassword;