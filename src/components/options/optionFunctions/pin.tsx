import { useState, useEffect } from "react";
import Numpad from "@/components/ui/numpad";
import { onEvent, emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";
import SwitchButton from "@/components/ui/switchButton";

/**
 * Renders the "App-lås" (app lock) settings UI that lets the user enable/disable app lock and set a numeric PIN.
 *
 * Subscribes to 'numpad-input' events to build or edit the PIN, fetches the stored `app_lock` user option on mount,
 * emits 'unsaved-changes' with `{ pin_code, app_lock }` when the PIN or switch changes, and unsubscribes from the event on unmount.
 *
 * @returns A JSX element containing the app lock toggle, masked numeric PIN input, and an on-screen numpad for small screens
 */
export default function PinOption() {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [userEnabled, setUserEnabled] = useState<boolean | null>(null);
  const [pswInput, setPswInput] = useState<string>(""); 


  useEffect(() => {
    const unsubscribe = onEvent('numpad-input', (input: string) => {
    setPswInput(prev => {
        if (input === 'delete') {
          return prev.slice(0, -1);
        }
        if (input === 'ok') {
          emitEvent('unsaved-changes', { 'pin_code': prev, "app_lock": enabled });
          return prev;
        }
        return prev + input;
    });
    });

    const fetchOption = async () => {
      const option = await getUserOption('app_lock');
      if (typeof option === 'boolean') {
        setEnabled(option);
        setUserEnabled(option);
      }
      setLoading(false);
    };

    fetchOption();


    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (enabled === null || userEnabled === null) return;
    if (userEnabled === enabled) return;
    emitEvent('unsaved-changes', { "app_lock": enabled });
  }, [enabled, pswInput]);

  return (
    <div className="p-4 grid gap-2 grid-cols-2 items-center">
      <div className="sm:w-3/4">
        <h2 className="text-xl font-semibold mb-2">App-lås</h2>
        <p>Skydda ditt konto med en pinkod</p>
      </div>
      {!loading && enabled !== null && (
        <div className="m-auto">
            <SwitchButton start={enabled} onChange={(checked) => setEnabled(checked)} />
        </div>
      )}
        {enabled && (
            <div className="col-span-full mt-4 flex flex-col sm:justify-between sm:items-center gap-4">
                <label className="flex flex-col justify-center items-center">
                    <p>Pinkod</p>
                    <input
                    type="password"
                    name="psw"
                    className="border p-2 text-white"
                    value={pswInput}
                    onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setPswInput(onlyDigits);
                        emitEvent('unsaved-changes', { 'pin_code': onlyDigits, "app_lock": enabled });
                    }}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    />

                </label>
                <div className="sm:hidden">
                    <Numpad/>
                </div>
            </div>
        )}
    </div>
  );
}