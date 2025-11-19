import { useState, useEffect } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";

export default function LanguageOption() {
    const [language, setLanguage] = useState<string>("sv");
    const [userLanguage, setUserLanguage] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const userLanguage = await getUserOption("language");
                if (userLanguage && typeof userLanguage === "string") {
                    setLanguage(userLanguage);
                    setUserLanguage(userLanguage);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching language option:", error);
            }
        };

        fetchLanguage();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userLanguage === null) return;
        if (language === userLanguage) {
            emitEvent("remove-unsaved-changes", {"language" : language});
            return;
        }
        emitEvent("unsaved-changes", {"language" : language});
    }, [language, userLanguage, loaded]);

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Språk</h2>
                <p>Välj det språk du vill använda i appen.</p>
            </div>
            {loaded ? (
                <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary" onChange={(e) => setLanguage(e.target.value)} defaultValue={language}>
                    <option value="sv" selected={language === "sv"}>Svenska</option>
                    <option value="en" selected={language === "en"}>English</option>
                </select>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}