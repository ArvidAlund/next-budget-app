import { useState, useEffect } from "react";
import Numpad from "@/components/ui/numpad";
import { onEvent } from "@/app/lib/eventbus";
import Switch from "@/components/ui/Switch";

export default function PinOption() {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [pswInput, setPswInput] = useState<string>(""); 


  useEffect(() => {
    setLoading(true);
    const unsubscribe = onEvent('numpad-input', (input: string) => {
    setPswInput(prev => {
        if (input === 'delete') {
        return prev.slice(0, -1); // ta bort sista tecknet
        }
        if (input === 'ok') {
        // här kan du trigga validering eller skicka PIN-koden
        console.log("PIN skickad:", prev);
        return prev;
        }
        return prev + input; // lägg till siffran
    });
    });


    return () => {
        unsubscribe();
    }
  }, []);

  return (
    <div className="p-4 grid gap-2 grid-cols-2 items-center">
      <div className="sm:w-3/4">
        <h2 className="text-xl font-semibold mb-2">App-lås</h2>
        <p>Skydda ditt konto med en pinkod</p>
      </div>
      {loading && (
        <div className="m-auto">
            <Switch onChange={(checked) => setEnabled(checked)} />
        </div>
      )}
        {enabled && (
            <div className="col-span-full mt-4">
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
