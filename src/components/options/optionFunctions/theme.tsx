import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";

/**
 * ThemeOption renders a theme selector and synchronizes it with the persisted user preference.
 *
 * Loads the saved theme on mount; when the saved value is available, updates local state and emits
 * "unsaved-changes" with the current theme if the selection differs from the saved value, or
 * "remove-unsaved-changes" if it matches.
 *
 * @returns The React element for the theme option UI (select input with light, dark, and system).
 */
export default function ThemeOption() {
    const [theme, setTheme] = useState<string>("system");
    const [userTheme, setUserTheme] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchTheme = async () => {
            try {  
                const userTheme = await getUserOption("theme");
                if (typeof userTheme === "string") {
                    setTheme(userTheme);
                    setUserTheme(userTheme);
                    setLoaded(true);
                }   
            } catch (error) {
                console.error("Error fetching theme option:", error);
            }
        };

        fetchTheme();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userTheme === null) return;
        if (theme === userTheme) {
            emitEvent("remove-unsaved-changes", {"theme" : theme});
            return;
        }
        emitEvent("unsaved-changes", {"theme" : theme});
    }, [theme, userTheme, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Tema</h2>
                <p>Välj mellan ljust, mörkt eller systemtema för applikationen.</p>
            </div>
            <div className="flex justify-center items-center">
                {loaded ? (
                    <select className="form-select w-full max-w-xs bg-primary text-secondary border-secondary accent-accent-300" onChange={(e) => setTheme(e.target.value)} defaultValue={theme}>
                        <option value="light">Ljust</option>
                        <option value="dark">Mörkt</option>
                        <option value="system">System</option>
                    </select>
                ) : (
                    <p className="w-full text-center">Laddar...</p>
                )}
            </div>
        </div>
    );
}