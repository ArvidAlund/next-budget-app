import { useState, useEffect } from "react";
import Numpad from "@/components/ui/numpad";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";
import SwitchButton from "@/components/ui/switchButton";


export default function AutoLockOption() {
    const [loaded, setLoaded] = useState(false);
    const [enabled, setEnabled] = useState<boolean | null>(null);
    const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
    const [minutesInput, setMinutesInput] = useState<number | null>(null);
    const [userMinutes, setUserMinutes] = useState<number | null>(null);

    useEffect(() => {

        const fetchMinutes = async () => {
            const option = await getUserOption('auto_lock_minutes');
            if (typeof option === 'number') {
                setMinutesInput(option);
                setUserMinutes(option);

                if (option > 0) {
                    setEnabled(true);
                    setUserEnabled(true);
                } else {
                    setEnabled(false);
                    setUserEnabled(false);
                }
                setLoaded(true);
            }
        };

        fetchMinutes();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        if (minutesInput === null) return;
        if (userEnabled === null || userMinutes === null) return;
        if (minutesInput === userMinutes) {
            const hasChanges = minutesInput !== userMinutes || enabled !== userEnabled;

            if (!hasChanges) {
                emitEvent("remove-unsaved-changes", { "auto_lock_minutes": enabled ? minutesInput : 0 });
                return;
            }
            emitEvent("unsaved-changes", { "auto_lock_minutes": enabled ? minutesInput : 0 });
        }
        emitEvent("unsaved-changes", { "app_lock_minutes": minutesInput });
    }, [enabled, minutesInput, loaded]);

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
              <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Auto lås</h2>
                <p>Lås sidan efter X antal minuter av inaktivitet</p>
              </div>
              {loaded && enabled !== null && (
                <div className="m-auto">
                    <SwitchButton start={enabled} onChange={(checked) => setEnabled(checked)} />
                </div>
              )}
                {enabled && (
                    <>
                        <div className="mt-4 col-span-full grid grid-cols-2 gap-2 justify-center items-center">
                            <p className="mb-2 text-center">Antal minuter innan automatisk låsning</p>
                            <label className="flex flex-col justify-center items-center">
                                <input
                                type="number"
                                name="minutes"
                                className="border p-2 text-white"
                                value={minutesInput === null ? "" : minutesInput}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setMinutesInput(null);
                                        return;
                                    }
                                    setMinutesInput(parseInt(e.target.value))
                                }}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                />
            
                            </label>
                            <div className="sm:hidden">
                                <Numpad/>
                            </div>
                        </div>
                    </>
                )}
            </div>
    );
}