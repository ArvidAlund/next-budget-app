import { useState, useEffect } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";
import SwitchButton from "@/components/ui/switchButton";

/**
 * Renders a settings panel that displays and controls the user's "mark recurring transactions" preference.
 *
 * On mount it loads the saved `highlight_recurring` option; while loading it shows a "Laddar..." placeholder.
 * When the user toggles the checkbox the component updates its local state and emits either
 * `unsaved-changes` (when the current value differs from the saved value) or `remove-unsaved-changes`
 * (when the current value matches the saved value) with payload `{ mark_recurring_transactions: boolean }`.
 *
 * @returns The rendered option panel as a JSX element.
 */
export default function MarkRecurringOption() {
    const [markRecurring, setMarkRecurring] = useState<boolean>(true);
    const [userMarkRecurring, setUserMarkRecurring] = useState<boolean | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchMarkRecurring = async () => {
            try {
                const userMarkRecurring = await getUserOption("highlight_recurring");
                if (typeof userMarkRecurring === "boolean") {
                    setMarkRecurring(userMarkRecurring);
                    setUserMarkRecurring(userMarkRecurring);
                    setLoaded(true);
                }   
            } catch (error) {
                console.error("Error fetching mark recurring option:", error);
            }
        };

        fetchMarkRecurring();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userMarkRecurring === null) return;
        if (markRecurring === userMarkRecurring) {
            emitEvent("remove-unsaved-changes", {"mark_recurring_transactions" : markRecurring});
            return;
        }
        emitEvent("unsaved-changes", {"mark_recurring_transactions" : markRecurring});
    }, [markRecurring, userMarkRecurring, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Markera Återkommande Transaktioner</h2>
                <p>Aktivera eller inaktivera markering av återkommande transaktioner i din transaktionslista.</p>
            </div>
            {loaded ? (
                <div className="flex justify-center items-center">
                    <SwitchButton
                        start={markRecurring}
                        onChange={() => setMarkRecurring(!markRecurring)}
                    />
                </div>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}