"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import LoadingMessage from "@/components/ui/loadingMessage";

const ResetPasswordPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setLoggedIn(!!session);
            setLoading(false);
        }
        checkSession();
    }, []);

    useEffect(() => {
        if (!loading && !loggedIn) {
            window.location.href = "/404";
        }
    }, [loading, loggedIn]);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const form = e.target as HTMLFormElement;
        const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement).value;
        if (newPassword !== confirmPassword) {
            setErrorMessage("Lösenorden matchar inte!");
            return;
        }
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
            setErrorMessage(error.message);
            return;
        }

        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
            setErrorMessage(signOutError.message);
            return;
        } else {
            setSuccess(true);
        }
    }

    if (loading) return <LoadingMessage message="Kontrollerar session..." />;

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-secondary/10">
            <h1 className="text-2xl font-bold mb-4">Återställ ditt lösenord</h1>
            {!success && <form onSubmit={handleChangePassword} className="bg-neutral-700 p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium mb-2">Nytt Lösenord</label>
                    <input type="password" id="newPassword" className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">Bekräfta Lösenord</label>
                    <input type="password" id="confirmPassword" className="w-full border px-3 py-2 rounded" required />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all duration-300">Ändra Lösenord</button>
            </form>
            }
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {success && (
                <>
                    <p className="text-green-500 mt-4">Lösenordet har ändrats framgångsrikt!</p>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-300" onClick={() => {window.location.href = "/login"}}>Gå till Inloggning</button>
                </>
            )}
        </div>
    );
}
export default ResetPasswordPage;