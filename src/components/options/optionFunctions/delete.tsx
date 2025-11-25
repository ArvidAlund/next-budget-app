import { useState, useEffect } from "react";
import deleteUser from "@/app/lib/db/deleteUser";


export default function DeleteDataOption() {
    const [loading, setLoading] = useState(false);
    const [del, setDel] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (!del) return;
        if (loading) return;
        const performDelete = async () => {
            setLoading(true);
            const success = await deleteUser();
            if (success.success) window.location.reload()
            setLoading(false);
            setDel(false);
            setConfirm(false);
        };

        performDelete();
    }, [del, loading]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Radera konto</h2>
                <p>Radera ditt konto och alla transaktioner. Detta kan inte ångras.</p>
            </div>
            <button className="p-2 border rounded w-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300" onClick={() => setConfirm(true)}>Radera konto</button>
            {confirm && (
                <div className="fixed left-0 top-0 w-full h-full bg-primary p-4 rounded flex flex-col justify-center items-center">
                    <h4 className="text-2xl font-bold sm:text-5xl">Radera konto</h4>
                    <p>Är du säker på att du vill radera ditt konto?</p>
                    <div className="flex gap-2 mt-4 [&>button]:border [&>button]:p-2 [&>button]:rounded [&>button]:text-lg [&>button]:transition-all [&>button]:duration-300">
                        <button className="bg-red-500 hover:bg-red-600" onClick={() => setDel(true)}>Radera</button>
                        <button className="hover:bg-neutral-500" onClick={() => setConfirm(false)}>Avbryt</button>
                    </div>
                </div>
            )}
        </div>
    );
}