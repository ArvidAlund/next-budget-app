import { emitEvent } from "@/app/lib/eventbus";
import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";

/**
 * Renders a time-format selection UI and synchronizes the selected value with the stored user option.
 *
 * Fetches the user's saved "time_format" option on mount and shows a loading state until it is loaded.
 * After loading, emits "unsaved-general-changes" with { time_format } when the selection differs from the stored value,
 * and emits "remove-unsaved-general-changes" with { time_format } when it matches the stored value.
 *
 * @returns A React element containing the time format option control (loading state or a select with "24h" and "12h" options).
 */
export default function TimeFormatOption() {
    const [timeFormat, setTimeFormat] = useState<string>("24h");
    const [userTimeFormat, setUserTimeFormat] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchTimeFormat = async () => {
            try {
                const userTimeFormat = await getUserOption("time_format");
                if (userTimeFormat && typeof userTimeFormat === "string") {
                    setTimeFormat(userTimeFormat);
                    setUserTimeFormat(userTimeFormat);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching time format option:", error);
            }
        };

        fetchTimeFormat();
    }, []);
    useEffect(() => {
        if (!loaded) return
        if (userTimeFormat === null) return;
        if (timeFormat === userTimeFormat) {
            emitEvent("remove-unsaved-general-changes", {"time_format" : timeFormat});
            return;
        }
        emitEvent("unsaved-general-changes", {"time_format" : timeFormat});
    }, [timeFormat, userTimeFormat, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Tidsformat</h2>
                <p>Välj det tidsformat du vill använda i appen.</p>
            </div>
            {loaded ? (
                <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary" onChange={(e) => setTimeFormat(e.target.value)} defaultValue={timeFormat}>
                    <option value="24h">24-timmarsformat</option>
                    <option value="12h">12-timmarsformat (AM/PM)</option>
                </select>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
            
        </div>
    );
}