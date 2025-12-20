import { useEffect, useState } from "react";

import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";
import SwitchButton from "@/components/ui/switchButton";

export default function ShowDiagramsOption() {
    const [loaded, setLoaded] = useState(false);
    const [showDiagrams, setShowDiagrams] = useState<boolean | null>(null);
    const [userShowDiagrams, setUserShowDiagrams] = useState<boolean | null>(null);
    useEffect(() => {
        const fetchShowDiagrams = async () => {
            try {
                const res = await getUserOption("show_charts");
                if (typeof res === "boolean") {
                    setShowDiagrams(res);
                    setUserShowDiagrams(res);
                }
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching show diagrams option:", error);
            }
        };

        fetchShowDiagrams();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        if (userShowDiagrams !== null && showDiagrams !== userShowDiagrams) {
            emitEvent("unsaved-changes", {
                showDiagrams: showDiagrams,
            });
            return;
        }
        emitEvent("remove-unsaved-changes", {
            showDiagrams: showDiagrams,
        });
    }, [showDiagrams, userShowDiagrams, loaded]);

    return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 items-center min-h-50">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Visa Diagram</h2>
                <p className="text-sm text-secondary">
                    Slå på eller av visning av diagram i översiktsvyn.
                </p>
            </div>
            <div className="flex justify-center items-center">   
                {showDiagrams !== null && (
                    <SwitchButton
                        start={showDiagrams}
                        onChange={(value) => setShowDiagrams(value)}
                    />
                )}
            </div>
        </div>
    );
}