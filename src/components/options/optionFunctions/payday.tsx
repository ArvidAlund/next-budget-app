import { useState, useEffect } from "react";
import { emitEvent } from "@/app/lib/eventbus";
import getUserOption from "@/app/lib/db/getUserOption";

export default function PaydayOption() {
    const [payday, setPayday] = useState<number>(1);
    const [userPayday, setUserPayday] = useState<number | null>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchPayday = async () => {
            try {  
                const userPayday = await getUserOption("payday_day");
                if (typeof userPayday === "number") {
                    setPayday(userPayday);
                    setUserPayday(userPayday);
                    setLoaded(true);
                }   
            } catch (error) {
                console.error("Error fetching payday option:", error);
            }
        };

        fetchPayday();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userPayday === null) return;
        
        if (payday < 1 || payday > 31) return;
        if (payday === userPayday || Number.isNaN(payday)) {
            emitEvent("remove-unsaved-changes", {"payday" : Number.isNaN(payday) ? userPayday : payday});
            return;
        }
        emitEvent("unsaved-changes", {"payday" : Number.isNaN(payday) ? userPayday : payday});
    }, [payday, userPayday, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Lönedag</h2>
                <p>Välj vilken dag i månaden du får lön.</p>
            </div>
            {loaded ? (
                <div className="flex flex-col">
                <input
                    type="number"
                    name="payday"
                    min={1}
                    max={31}
                    value={payday}
                    onChange={(e) => setPayday(parseInt(e.target.value))}
                    className="p-2 border rounded bg-primary text-secondary"
                />
                {payday < 1 || payday > 31 ? (
                    <p className="text-red-500 text-sm">
                    Vänligen ange en giltig dag (1–31).
                    </p>
                ) : null}
                </div>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}