import { useEffect, useState } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";

export default function CurrencyOption() {
    const [currency, setCurrency] = useState<string>("SEK");
    const [userCurrency, setUserCurrency] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const userCurrency = await getUserOption("default_currency");
                if (userCurrency && typeof userCurrency === "string") {
                    setCurrency(userCurrency);
                    setUserCurrency(userCurrency);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching currency option:", error);
            }
        };

        fetchCurrency();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userCurrency === null) return;
        if (currency === userCurrency) {
            emitEvent("remove-unsaved-general-changes", {"currency" : currency});
            return;
        }
        emitEvent("unsaved-general-changes", {"currency" : currency});
    }, [currency, userCurrency, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Valuta</h2>
                <p>Välj den valuta du vill använda i appen.</p>
            </div>
            <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary" onChange={(e) => setCurrency(e.target.value)} defaultValue={currency}>
                <option value="SEK">Svenska Kronor (SEK)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
            
            </select>
        </div>
    );
}
