import { useState } from "react";
import supabase from "@/app/lib/supabaseClient";

/**
 * Render a "Logga ut" option with a button that signs the user out via Supabase.
 *
 * Invokes `supabase.auth.signOut({ scope: 'local' })` when the button is clicked and manages a loading state; the button shows "Loggar ut..." and is disabled while the sign-out is in progress.
 *
 * @returns A JSX element containing the logout UI
 */
export default function LogOutOption() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
         if (loading) return;
        setLoading(true);
        try {
            await supabase.auth.signOut({ scope: 'local' });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Logga ut</h2>
                <p>Logga ut från ditt konto.</p>
            </div>
            <button 
                className="p-2 border rounded w-full text-white transition-all duration-300" 
                onClick={handleLogout}
                disabled={loading}
            >
                {loading ? 'Loggar ut...' : 'Logga ut'}
            </button>
        </div>
    );
}