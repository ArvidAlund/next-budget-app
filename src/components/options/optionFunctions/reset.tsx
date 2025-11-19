import { useState, useEffect } from "react";
import removeUser from "@/app/lib/db/removeUser";
import checkOrCreateUser from "@/app/lib/db/checkUser";

export default function ResetDataOption() {
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        if (!reset) return;
        if (loading) return;
        const performReset = async () => {
            setLoading(true);
            try {
                await removeUser();
                await checkOrCreateUser();
                window.location.reload();
            } catch (error) {
                console.error("Error resetting user data:", error);
            }
            setLoading(false);
            setReset(false);
        };

        performReset();
    }, [reset, loading]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Återställ Data</h2>
                <p>Återställ alla dina data till fabriksinställningarna. Detta kan inte ångras.</p>
            </div>
            <button className="p-2 border rounded w-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300" onClick={() => setReset(true)}>Återställ Data</button>
        </div>
    );
}