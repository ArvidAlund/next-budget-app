import ThemeOption from "../optionFunctions/theme";

import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";

export default function AppearanceOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    return (
        <section className="text-secondary">
            <div>
                <h1 className="text-2xl font-bold mb-4 w-full text-center">Utseende Inställningar</h1>
                <button
                    onClick={() => setSaveChanges(true)}
                    disabled={Object.keys(unsavedChanges).length === 0}
                >
                    Spara ändringar
                </button>
            </div>
            <div className="space-y-4 [&>*]:border-b [&>*]:pb-4">
                <ThemeOption />
            </div>
        </section>
    );
}