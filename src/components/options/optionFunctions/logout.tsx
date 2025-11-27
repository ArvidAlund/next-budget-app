import { useState } from "react";
import supabase from "@/app/lib/supabaseClient";

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