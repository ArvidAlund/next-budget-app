import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";
import SwitchButton from "@/components/ui/switchButton";


export default function CarryoverOption() {
    const [carryover, setCarryover] = useState<boolean>(false);
    const [userCarryover, setUserCarryover] = useState<boolean | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchCarryover = async () => {
            try {
                const userCarryover = await getUserOption("carryover");
                if (typeof userCarryover === "boolean") {
                    setCarryover(userCarryover);
                    setUserCarryover(userCarryover);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching carryover option:", error);
            }
        };

        fetchCarryover();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userCarryover === null) return;
        if (carryover === userCarryover) {
            emitEvent("remove-unsaved-changes", {"carryover" : carryover});
            return;
        }
        emitEvent("unsaved-changes", {"carryover" : carryover});
    }, [carryover, userCarryover, loaded]);
    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Överför Oanvänt Budgetsaldo</h2>
                <p>Aktivera för att automatiskt överföra oanvänt budgetsaldo till nästa månad.</p>
            </div>
            {loaded ? (
                <div className="flex flex-col justify-center items-center">
                    <label className="inline-flex items-center">
                        <SwitchButton start={carryover} onChange={() => setCarryover(!carryover)} />
                    </label>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <p>Laddar...</p>
                </div>
            )}
        </div>
    );
}