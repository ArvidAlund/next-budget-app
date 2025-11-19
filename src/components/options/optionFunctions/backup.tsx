import { emitEvent } from "@/app/lib/eventbus";
import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";

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
            emitEvent("remove-unsaved-general-changes", {"auto_backup" : autoBackup});
            return;
        }
        emitEvent("unsaved-general-changes", {"auto_backup" : autoBackup});
    }, [autoBackup, userAutoBackup, loaded]);

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Automatisk Säkerhetskopiering</h2>
                <p>Aktivera eller inaktivera automatisk säkerhetskopiering av dina data.</p>
            </div>
            {loaded ? (
                <div className="flex justify-center items-center">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 accent-accent-300 text-secondary bg-primary border-secondary"
                            checked={autoBackup}
                            onChange={(e) => setAutoBackup(e.target.checked)}
                        />
                        <span className="ml-2">{autoBackup ? "Aktiverad" : "Inaktiverad"}</span>
                    </label>
                </div>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}