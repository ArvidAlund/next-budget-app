import { emitEvent } from "@/app/lib/eventbus";
import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import SwitchButton from "@/components/ui/switchButton";

/**
 * Render a UI control for viewing and toggling the user's automatic backup setting.
 *
 * The component loads the persisted `auto_backup` option on mount and reflects its state
 * with a checkbox. When the checkbox value differs from the stored setting the component
 * emits an event to indicate unsaved general changes; when it matches the stored value it
 * emits an event to remove those unsaved-change notifications.
 *
 * @returns A JSX element containing the automatic backup option control.
 */
export default function AutoBackupOption() {
    const [autoBackup, setAutoBackup] = useState<boolean>(true);
    const [userAutoBackup, setUserAutoBackup] = useState<boolean | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchAutoBackup = async () => {
            try {
                const userAutoBackup = await getUserOption("auto_backup");
                if (typeof userAutoBackup === "boolean") {
                    setAutoBackup(userAutoBackup);
                    setUserAutoBackup(userAutoBackup);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching auto backup option:", error);
            }
        };

        fetchAutoBackup();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userAutoBackup === null) return;
        if (autoBackup === userAutoBackup) {
            emitEvent("remove-unsaved-changes", {"auto_backup" : autoBackup});
            return;
        }
        emitEvent("unsaved-changes", {"auto_backup" : autoBackup});
    }, [autoBackup, userAutoBackup, loaded]);

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Automatisk Säkerhetskopiering</h2>
                <p>Aktivera eller inaktivera automatisk säkerhetskopiering av dina data.</p>
            </div>
            {loaded ? (
                <div className="flex flex-col justify-center items-center">
                    <SwitchButton
                        start={autoBackup}
                        onChange={() => setAutoBackup(!autoBackup)}
                    />
                </div>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}