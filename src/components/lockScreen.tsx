import Numpad from "./ui/numpad";
import getUserOption from "@/app/lib/db/getUserOption";
import { useState, useEffect } from "react";
import { onEvent } from "@/app/lib/eventbus";

export default function LockScreen({onUnlock}: {onUnlock: () => void}) {
    const [loaded, setLoaded] = useState(false);
    const [pinCode, setPinCode] = useState<string>("");
    const [inputCode, setInputCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchPin = async () => {
            const pin = await getUserOption('pin_code');
            if (typeof pin === 'string') {
                setPinCode(pin);
            }
            setLoaded(true);
        };
        fetchPin();
        
    }, []);

    useEffect(() => {
        if (!loaded) return;

        const unsubscribe = onEvent('numpad-input', (input: string) => {
            if (input === 'delete') {
                setInputCode(prev => prev.slice(0, -1));
                return;
            }
            if (input === 'ok') {
                if (inputCode === pinCode) {
                    onUnlock();
                    setInputCode("");
                } else {
                    setInputCode("");
                }
                return;
            }
            setInputCode(prev => prev + input);
        });

        return () => {
            unsubscribe();
        }
    }, [loaded, pinCode]);

    useEffect(() => {
        if (!loaded) return;

        if (inputCode.length >= pinCode.length) {
            if (inputCode === pinCode) {
                onUnlock();
                setInputCode("");
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false)
                    setInputCode("");
                }, 650);
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key >= '0' && e.key <= '9') {
                console.log(e.key);
            setInputCode(prev => prev + e.key);
            } else if (e.key === 'Backspace') {
            setInputCode(prev => prev.slice(0, -1));
            } else if (e.key === 'Enter') {
            if (inputCode === pinCode) {
                onUnlock();
                setInputCode("");
            } else {
                setInputCode("");
            }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [loaded, inputCode, pinCode, onUnlock]);

    if (!loaded) return null;
    if (pinCode === "") return null;
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-primary p-4 rounded flex flex-col justify-center items-center z-500 text-secondary">
            <h4 className="text-2xl font-bold sm:text-5xl mb-4">App-lås</h4>
            <p className="mb-4">Ange din pinkod för att låsa upp appen</p>
            {pinCode.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {Array.from({ length: pinCode.length }).map((_, index) => (
                        <div key={index} className={`w-6 h-6 border-b-2 ${index < inputCode.length ? 'bg-white rounded-full' : 'bg-transparent'} ${error ? "animate-shake" : ""}`}></div>
                    ))}
                </div>
            )}
            <div className="w-full">
                <Numpad />
            </div>
        </div>
    );
}