import { useState, useEffect } from "react";
import Numpad from "@/components/ui/numpad";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";
import SwitchButton from "@/components/ui/switchButton";


/**
 * Renders the AutoLockOption control and manages its state: loads the stored auto-lock minutes, exposes a toggle and numeric input for minutes, and emits "unsaved-changes" or "remove-unsaved-changes" events when the user modifies the setting.
 *
 * @returns The AutoLockOption React element.
 */
export default function AutoLockOption() {
    const [loaded, setLoaded] = useState(false);
    const [enabled, setEnabled] = useState<boolean | null>(null);
    const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
    const [minutesInput, setMinutesInput] = useState<number | null>(null);
    const [userMinutes, setUserMinutes] = useState<number | null>(null);
    const [showOption, setShowOption] = useState<boolean>(false);

    useEffect(() => {

        const fetchMinutes = async () => {
            try {
                const active = await getUserOption('app_lock');
                if (typeof active === 'boolean' && active) {
                    setShowOption(true);
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
                } else {
                    setMinutesInput(0);
                    setUserMinutes(0);
                    setEnabled(false);
                    setUserEnabled(false);
                    setLoaded(true);
                }
            } catch (error) {
                console.error('Failed to fetch auto lock minutes:', error);
                setMinutesInput(0);
                setUserMinutes(0);
                setEnabled(false);
                setUserEnabled(false);
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
        emitEvent("unsaved-changes", { "auto_lock_minutes": minutesInput });
    }, [enabled, minutesInput, loaded]);

    
    if (!showOption) return null;
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
                                    const parsed = parseInt(e.target.value);
                                    if (!isNaN(parsed) && parsed >= 0) {
                                        setMinutesInput(parsed);
                                    }
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