import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";
import SwitchButton from "@/components/ui/switchButton";

export default function ShowCategoryIconsOption() {
    const [loaded, setLoaded] = useState(false);
    const [showCategoryIcons, setShowCategoryIcons] = useState<boolean | null>(null);
    const [userShowCategoryIcons, setUserShowCategoryIcons] = useState<boolean | null>(null);
    useEffect(() => {
        const fetchShowCategoryIcons = async () => {
            try {
                const res = await getUserOption("show_category_icons");
                if (typeof res === "boolean") {
                    setShowCategoryIcons(res);
                    setUserShowCategoryIcons(res);
                }
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching show category icons option:", error);
            }
        };

        fetchShowCategoryIcons();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        if (userShowCategoryIcons !== null && showCategoryIcons !== userShowCategoryIcons) {
            emitEvent("unsaved-changes", {
                showCategoryIcons: showCategoryIcons,
            });
            return;
        }
        emitEvent("remove-unsaved-changes", {
            showCategoryIcons: showCategoryIcons,
        });
    }, [showCategoryIcons, userShowCategoryIcons, loaded]);

    return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 items-center min-h-50">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Visa Kategori Ikoner</h2>
                <p className="text-sm text-secondary">
                    Slå på eller av visning av ikoner bredvid kategorinamn.
                </p>
            </div>
            <div className="flex justify-center items-center">   
                {showCategoryIcons !== null && (
                    <SwitchButton
                        start={showCategoryIcons}
                        onChange={(value) => setShowCategoryIcons(value)}
                    />
                )}
            </div>
        </div>
    );
}