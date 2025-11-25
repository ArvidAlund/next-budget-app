import { useState, useEffect } from "react";
import Numpad from "@/components/ui/numpad";
import { onEvent } from "@/app/lib/eventbus";

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
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                checked={enabled}
                onChange={() => setEnabled(!enabled)}
                className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer
                                peer-checked:bg-green-500 transition-colors duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full
                                transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
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
